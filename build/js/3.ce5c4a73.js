(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{74:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));n(77);var o=n(0),l=n.n(o),a=n(2),r=(n(75),function(e){return l.a.createElement("li",{className:"todo-item"},l.a.createElement("div",null,l.a.createElement("div",null,e.todo.name),l.a.createElement("div",null,e.todo.desc)),l.a.createElement(a.Space,null,l.a.createElement(a.Button,{type:"primary",onClick:function(){return e.switchStatus(e.todo.id)}},e.todo.done?"Undone":"Done"),l.a.createElement(a.Button,{danger:!0,onClick:function(){return e.onRemove(e.todo.id)}},"Delete")))})},75:function(e,t,n){var o=n(19),l=n(76);"string"==typeof(l=l.__esModule?l.default:l)&&(l=[[e.i,l,""]]);var a={insert:"head",singleton:!1};o(l,a);e.exports=l.locals||{}},76:function(e,t,n){},81:function(e,t,n){"use strict";n.r(t);var o=n(0),l=n(31),a=n(18),r=n(74),u=n(2);t.default=Object(l.observer)((function(){var e=Object(a.c)(),t=e.todos,n=e.undoneCount,l=e.doneCount,c=e.addNewTodo,d=e.removeById,i=e.toggleStatusById;return o.createElement("div",null,o.createElement("header",null,o.createElement("h4",null,"Hook"),o.createElement(u.Button,{onClick:c},"Add New"),o.createElement("div",null,"Done: ",l),o.createElement("div",null,"Undone: ",n)),o.createElement("ul",null,t.map((function(e){return o.createElement(r.a,{key:e.id,todo:e,onRemove:d,switchStatus:i})}))))}))}}]);