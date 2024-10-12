document.querySelectorAll('.card.pointer').forEach((el)=>{
  console.log(el);
  el.onclick = ()=>{
    console.log('click');
    location.href = '/product/detail/'+el.getAttribute('data-code');
  }
})