document.addEventListener('DOMContentLoaded', () => {
  var iDiv = document.createElement('div');
  iDiv.id = 'grid';
  iDiv.className = 'grid';
  document.body.appendChild(iDiv);
  var innerDiv;
  for (var i = 0; i < 200; i++) {
    innerDiv = document.createElement('div');
    iDiv.appendChild(innerDiv);
  }
})
