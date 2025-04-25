function includeHTML() {
  $('[data-html-src]').each((index ,ele)=>{
    $.get($(ele).attr('data-html-src') , (data)=> {
      $(ele).replaceWith(data)
      window.scrollTo(0,0)
    })
  })
}

includeHTML()
