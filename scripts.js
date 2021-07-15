var app = new function() {
  this.el = document.getElementById('tasks');
  this.tasks = [];
  this.completedList = [];




  this.FetchAll = function() {
    var data = '';

    if (this.tasks.length > 0) {
      for (i = 0; i < this.tasks.length; i++) {
        data += `<tr><td> ${ (i + 1) }. ${ this.tasks[i] } </td>
        <td><button onclick="app.Edit( ${ i } )" class="btn btn-warning">Edit</button></td>
        <td><button onclick="app.Delete( ${ i } )" class="btn btn-danger">Delete</button></td>
        <td><button onclick="app.Completed( ${ i } )" class="btn btn-success">Completed</button></td>
        </tr>`;
      }
    }
    this.Count(this.tasks.length);
    return this.el.innerHTML = data;
  };




  this.Add = function() {
    el = document.getElementById('add-todo');
    var task = el.value;

    if(task) {
      this.tasks.push(task.trim());
      el.value = '';
      this.FetchAll();
    }
  };




  this.CompletedList = function() {
    var completedData = '';

    if (this.completedList.length > 0) {
      for (j = 0; j < this.completedList.length; j++) {
        completedData += `<tr><td class="text-success"> ${ (j + 1) }. ${ this.completedList[j] } </td></tr>`;
      }
    }
    return document.getElementById('completed-list').innerHTML = completedData;
  }



  this.Completed = function(item) {
    var compItem = this.tasks[item];

    this.completedList.push(compItem);
    this.tasks.splice([item], 1);
    this.FetchAll();
    this.CompletedList();
  }




  this.Edit = function(item) {
    el = document.getElementById('edit-todo');
    el.value = this.tasks[item]
    document.getElementById('edit-box').style.display = 'block';
    self = this;

    document.getElementById('save-edit').onsubmit = function() {
      var task = el.value;
      if (task) {
        self.tasks.splice(item, 1, task.trim());
        self.FetchAll();
        CloseInput();
      }
    }
  };




  this.Delete = function(item) {
    this.tasks.splice(item, 1);
    this.FetchAll();
  };




  this.Count = function(data) {
    var el = document.getElementById('counter');
    var name = 'tasks';
    if(data) {
      if(data == 1) {
        name = 'task';
      }
      el.innerHTML = data + ' ' + name;
    } else {
      el.innerHTML = "No " + name;
    }
  };
}

app.FetchAll();

function CloseInput() {
  document.getElementById('edit-box').style.display = 'none';
}
