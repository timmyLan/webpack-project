import greeter from './Greeter';
import './main.scss';
import 'bootstrap';
import 'bootstrapTable';
import data from './src/data/data.json'
(function(){
  document.getElementById('root').appendChild(greeter);
  $('#table').bootstrapTable({
      columns: [{
          field: 'id',
          title: 'Item ID'
      }, {
          field: 'name',
          title: 'Item Name'
      }, {
          field: 'price',
          title: 'Item Price'
      }],
      data:data.data
  });
})()
