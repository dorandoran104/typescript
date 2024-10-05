const main = document.querySelector('#main');

const write_btn = main.querySelector('button.write_page');
write_btn.onclick = ()=>{
  location.href = '/admin/employee/write'
}