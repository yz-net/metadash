// @ts-nocheck

import * as d3 from "d3";

import D3Component from "../D3Component";

import "./styles.scss";

export default class extends D3Component {
  constructor(props) {
    super(props);

    this.initializeChart = this.initializeChart.bind(this);
    this.updateChart = this.updateChart.bind(this);
  }

  initializeChart() {
    const svg = d3.select(this.svg).html("");
    const height =
      this.props.height || svg.node().getBoundingClientRect().height;
    svg.attr("height", height + "px");
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateChart(prevProps, prevState);
  }

  updateChart(prevProps, prevState) {
    const svg = d3.select(this.svg);

    const width = svg.node().getBoundingClientRect().width,
      height = Math.min(
        width,
        this.props.height || svg.node().getBoundingClientRect().height,
      );

    svg.attr("height", height + "px");

    const items = this.props.items;
    function allItemsMatch(arr1, arr2) {
      if (arr1.length !== arr2.length) {
        return false;
      }
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].id !== arr2[i].id) {
          return false;
        }
        if (arr1[i].count !== arr2[i].count) {
          return false;
        }
      }
      return true;
    }

    if (allItemsMatch((prevProps || { items: [] }).items, this.props.items)) {
      return;
    }

    const root = d3
      .stratify()
      .id((d) => d.label.split("|")[0])
      .parentId((d) => d.label.split("|")[1])(items);

    var packLayout = d3.pack().padding(0.725).size([width, height]);

    root.sum((d) => Number(d.count ? d.count : 0));

    const data = root
      .descendants()
      .filter((d) => d.data.label.indexOf("|country") < 0)
      .filter((d) => d.data.label.indexOf("country|") < 0);

    packLayout(root);
    svg.selectAll("circle.city");

    this.allowInteraction = data.length;

    const r = (d) => d.r || 0;
    const x = (d) => d.x || 0;
    const y = (d) => d.y || 0;

    svg
      .selectAll("circle.city")
      .data(data)
      .join(
        (enter) =>
          enter
            .append("circle")
            .classed("city", true)
            .on("mouseover", (event, d) => this.props.onMouseOver(d.data))
            .on("mouseout", (event, d) => this.props.onMouseOut(d.data))
            .on("click", (event, d) => {
              if (
                this.props.selections?.length === 1 &&
                this.props.selections[0].id === d.data.id
              ) {
                this.props.updateSelections([]);
              } else {
                this.props.updateSelections([d.data]);
              }
            })
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", r),
        (update) =>
          update
            .attr("data-city", (d) => d.data.label)
            .each(function (d, i) {
              let handle = d3.select(this).style("opacity", "0.5");
              const newRadius = r(d);
              const currentRadius = d3.select(this).attr("r") || 0;

              if (
                newRadius > 0 &&
                currentRadius > 0 &&
                currentRadius !== newRadius
              ) {
                handle = handle.transition().duration(1000 * Math.random());
              } else {
              }

              handle
                .style("opacity", "1")
                .attr("cx", x)
                .attr("cy", y)
                .attr("r", r);
            }),
        (exit) => exit.remove(),
      );

    d3.select(window).on("resize.cluster", this.redrawChart.bind(this));
  }

  newMethod(handle, t) {
    handle = handle.transition(t);
    return handle;
  }
}
