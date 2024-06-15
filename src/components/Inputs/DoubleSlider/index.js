import React from "react";
import * as d3 from "d3";

import D3Component from "../../Viz/D3Component";

export default class extends D3Component {
  constructor(props) {
    super(props);

    this.state = {
      margin: props.margin || {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      handles: [],
      range: [{ value: props.min }, { value: props.max }],
      labels: [{ value: props.min }, { value: props.max }],
    };

    this.scale = this.scale.bind(this);
    this.valueToX = this.valueToX.bind(this);
    this.xToValue = this.xToValue.bind(this);
    this.limitValue = this.limitValue.bind(this);
    this.limitX = this.limitX.bind(this);
    this.getHandleRange = this.getHandleRange.bind(this);
    this.updateLabels = this.updateLabels.bind(this);
    this.updateRange = this.updateRange.bind(this);
    this.updateTrackHighlight = this.updateTrackHighlight.bind(this);

    this.repositionHandles = this.repositionHandles.bind(this);
  }

  scale() {
    return (
      d3
        .scaleLinear()
        .domain([this.props.min, this.props.max])
        // .range([this.margin.left, this.width - this.margin.right]);
        .range([this.state.margin.left, this.width - this.state.margin.right])
    );
  }

  valueToX(val) {
    return this.scale()(val) - this.handleWidth / 2;
  }

  xToValue(x) {
    return this.scale().invert(x + this.handleWidth / 2);
  }

  limitValue(value) {
    return Math.max(this.props.min, Math.min(this.props.max, value));
  }

  limitX(x) {
    return this.valueToX(this.limitValue(Math.round(this.xToValue(x))));
  }

  getHandleRange() {
    let range = [];
    d3.select(this.svg)
      .select(".handle-layer")
      .selectAll("image.handle-icon")
      .each((d) => range.push(d));

    range = range.sort((a, b) => {
      return a.value < b.value ? -1 : 1;
    });
    return range;
  }

  updateLabels() {
    const handles = d3
      .select(this.svg)
      .select(".handle-layer")
      .selectAll(".handle");

    handles.each(function (d) {
      d3.select(this).select("text").text(d.value);
    });
  }

  updateRange() {
    let range = this.getHandleRange();
    this.props.updateSelections(range.map((x) => x.value));
    // this.setState({ range })
  }

  updateTrackHighlight() {
    let xValues = [];

    d3.select(this.svg)
      .selectAll(".handle")
      .each(function () {
        // console.log("Double slider handle iter", this)
        xValues.push(Number(d3.select(this).attr("x")));
      });

    d3.select(this.svg)
      .select(".highlight")
      .attr("x", d3.min(xValues) + this.handleWidth / 2)
      .attr("width", d3.max(xValues) - d3.min(xValues));
  }

  updateChart() {}

  initializeChart() {
    this.render();

    let svg = d3.select(this.svg);
    svg.selectAll("*").remove();
    svg.html("");

    try {
      this.svg.current.innerHTML = "";
    } catch (e) {}

    svg = d3.select(this.svg);

    const bbox = svg.node().getBoundingClientRect(),
      width = bbox.width,
      height = bbox.height,
      handleHeight = this.props.handleHeight || 17.151,
      handleWidth = this.props.handleWidth || 13,
      trackHeight = this.props.trackHeight || 6;

    let yCenter =
      this.state.margin.top + (height - this.state.margin.bottom) / 2;

    this.width = width;
    this.height = height;
    this.handleWidth = handleWidth;
    this.setState({ yCenter });
    this.handleHeight = handleHeight;
    let trackX = (_) => this.state.margin.left,
      trackWidth = (_) =>
        width - this.state.margin.left - this.state.margin.right;

    svg.attr("height", height + "px");

    svg
      .append("rect")
      .classed("track", true)
      .attr("x", function () {
        return trackX(this);
      })
      .attr("width", function () {
        return trackWidth(this);
      })

      .attr("y", yCenter - trackHeight / 2)
      .attr("height", trackHeight);

    svg
      .append("rect")
      .classed("highlight", true)
      .attr("y", yCenter - trackHeight / 2)
      .attr("height", trackHeight);

    function dragstarted(e, d) {
      d3.select(this).raise().classed("active", true);
    }

    const limitX = this.limitX,
      xToValue = this.xToValue,
      updateLabels = this.updateLabels;

    const updateTrackHighlight = this.updateTrackHighlight;

    function dragged(e, d) {
      let yr = 0;
      d3.select(this).attr("x", function (event) {
        yr = xToValue(limitX(event.x));
        return limitX(event.x);
      });
      d3.select(this).attr("transform", function (event) {
        return `translate(${limitX(event.x)},${yCenter - handleHeight / 2})`;
      });

      d3.select(this).attr("data-value", (d.value = yr));
      updateLabels();
      updateTrackHighlight();
    }

    const updateRange = this.updateRange;

    function dragended(e, d) {
      d3.select(this).classed("active", false);
      updateRange();
    }

    const data = this.props.selections
      ? this.props.selections.map((x) => {
          return { value: x };
        })
      : [{ value: this.props.min }, { value: this.props.max }];

    const handleLayer = svg.append("g").classed("handle-layer", true);

    const handleGroups = handleLayer
      .selectAll("g.handle")
      .data(data)
      .enter()
      .append("g")
      .classed("handle", true)
      .attr("x", (x) => this.valueToX(x.value))
      .attr(
        "transform",
        (x) =>
          `translate(${this.valueToX(x.value)},${yCenter - handleHeight / 2})`,
      )
      .call(
        d3
          .drag()
          .on("start", (event, d) => dragstarted(event, d))
          .on("drag", (event, d) => dragged(event, d))
          .on("end", (event, d) => dragended(event, d)),
      );

    updateTrackHighlight();
    const svgString =
      "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxNy4xNTEiIHZpZXdCb3g9IjAgMCAxMyAxNy4xNTEiPjxwYXRoIGQ9Ik0yNDAsNDQwVjQyOWgxMnYxMWwtNiw1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzOS41IC00MjguNSkiIGZpbGw9IiNmZmYiIHN0cm9rZT0iI2FhYSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+";

    handleGroups
      .append("image")
      .classed("handle-icon", true)
      .attr("xlink:href", `data:image/svg+xml;base64,${svgString}`)
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", handleWidth)
      .attr("height", handleHeight);

    handleGroups
      .append("text")
      .classed("value-label", true)
      .text((d) => d.value)
      .attr("transform", function () {
        return `translate(${
          handleWidth / 2 - d3.select(this).node().getBBox().width / 2
        },${yCenter + handleHeight / 2 + 1})`;
      });

    d3.select(window).on(
      "resize.doubleslider" + this.props.label,
      this.redrawChart.bind(this),
    );
  }

  repositionHandles(arr) {
    if (!arr) {
      arr = [this.props.min, this.props.max];
    }

    const handleLayer = d3.select(this.svg).select(".handle-layer");
    handleLayer
      .selectAll(".handle")
      .data(
        arr.map((x) => {
          return { value: x };
        }),
      )
      .attr("x", (x) => this.valueToX(x.value))
      .attr(
        "transform",
        (x) =>
          `translate(${this.valueToX(x.value)},${this.state.yCenter - this.handleHeight / 2})`,
      );
  }

  componentDidUpdate(oldProps, newData) {
    super.componentDidUpdate.call(this);

    function legitArray(arr) {
      if (!arr) {
        return [-1, -1];
      }
      return arr;
    }

    const oldArr = legitArray(oldProps.selections),
      newArr = legitArray(this.props.selections);

    function arrsMatch(arr1, arr2) {
      if (arr1.length !== arr2.length) {
        return false;
      }
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
          return false;
        }
      }
      return true;
    }

    if (!arrsMatch(oldArr, newArr)) {
      if (!this.props.selections) {
        // reset detected
        this.repositionHandles(this.props.selections);
        this.updateLabels();
        this.updateTrackHighlight();
      }
    }
  }

  render() {
    return (
      <div className="flex w-full flex-wrap">
        <div className="flex w-full flex-1 items-center justify-end">
          {this.props.label}
        </div>
        <div className="flex-1">{D3Component.prototype.render.call(this)}</div>
      </div>
    );
  }
}
