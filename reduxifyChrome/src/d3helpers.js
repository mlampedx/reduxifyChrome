// import parsedCodeObj?

/*IMPORTING THE D3 library */
import { select, cluster, hierarchy, append } from "d3";

const exports = {};

// import {hierarchy, tree, select, path} from "d3";
// import {hierarchy, tree} from "d3-hierarchy";
// import {select} from "d3-selection";
// import {path} from "d3-path";
// var d3 = Object.assign({}, require("d3-hierarchy"), require("d3-selection"), require("d3-path"));
//----*-------*-----*//
/* ACTUAL DATA FOR NOW (IN JSON) */
const answerD3Actions = {
  'name': 'Action Creators',
  'children': [
    {
      'name': 'addTodo',
      'children': [
        {
          'name': 'ADD_TODO'
        }
      ]
    },
    {
      'name': 'setVisibilityFilter',
      'children': [
        {
          'name': 'SET_VISIBILITY_FILTER'
        }
      ]
    },
    {
      'name': 'toggleTodo',
      'children': [
        {
          'name': 'TOGGLE_TODO'
        }
      ]
    },
    {
      'name': 'undoAction',
      'children': [
        {
          'name': 'UNDO'
        }
      ]
    },
    {
      'name': 'redoAction',
      'children': [
        {
          'name': 'REDO'
        }
      ]
    }
  ]
}

const answerD3UI = {
  'name': 'Containers',
  'children': [
    {
      'name': 'TestTodoList',
      'children': [
        {
          'name': 'todos'
        },
				{
					'name': 'onTodoClick'
				}
      ]
    }
  ]
}


const answerD3Reducers = {
  'name': 'Reducers',
  'children': [
      {
        'name': 'visibilityFilter',
        'children': [
          {
            'name': 'SET_VISIBILITY_FILTER'
          }
        ]
      },
      {
        'name': 'todos',
        'children': [
          {
            'name': 'ADD_TODO'
          },
          {
            'name': 'TOGGLE_TODO'
          }
        ]
      }
  ]
}


////--- D3 LOGIC -----////
//The canvas for the tree//

// takes in DOM element to be transformed into Cluster, && data that the Cluster visualizes
exports.transformVizNode = function transformVizNode(element, data) {
  var width = 700;
  var height = 700; //length
	//creates the cluster

	var svg = select(element)
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g").attr("transform", "translate(20,0)");


	var ourCluster = cluster().size([height-400, width-200]);
//passes hierarchiacalsdf data into cluster to create the root node
	var nodeHierarchy = hierarchy(data);

	ourCluster(nodeHierarchy);

	// entering the nodes --> finally appending to DOM
var nodeEnter = svg.selectAll(".node")
	.data(nodeHierarchy.descendants())
	.enter().append('g')
	.attr("class", function(d) { return "node" + (d.children ? "node-internal" : "node-leaf"); })
   .attr("transform", function(d) {
   	console.log(d.y);
    return "translate(" + d.y + "," + d.x + ")";
  });

//creating links

var link = svg.selectAll(".node")
    .data(nodeHierarchy.descendants().slice(1))
    .enter().append("path")
      .attr("class", "link")
      .attr("d", function(d) {
        return "M" + d.y + "," + d.x
            + "C" + (d.parent.y + 100) + "," + d.x
            + " " + (d.parent.y + 100) + "," + d.parent.x
            + " " + d.parent.y + "," + d.parent.x;
      });

console.log(link)

nodeEnter.append("circle")
	.attr("r", 10)
  .style("fill", "lightsteelblue");

nodeEnter.append("text")
   .text(function(d) {
   	return d.data.name;
});
}

module.exports = exports;