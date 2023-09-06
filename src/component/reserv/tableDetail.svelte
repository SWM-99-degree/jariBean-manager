<script>
	import CelanderTab from './celanderTab.svelte';
  import selectdTable from '../../store/reserv.js'

  let table= {}
  selectdTable.subscribe(tableItems => {
    table = tableItems
  })
</script>
<div class="card p-3">
<h4>{table.title}</h4>    
<ul class="p-0 m-1">
    <li class="badge mx-1 fs-6 text-dark text-gray bg-light rounded-pill">{table.number}</li>
    {#each table.attribute as attr}
    <li class="badge mx-1 fs-6 text-dark text-gray bg-light rounded-pill">{attr}</li>  
    {/each}
    
</ul>
<ul class="nav nav-tabs my-3 bg-secondary" id="detailTab" role="tablist">
    <li class="nav-item">
      <a class="nav-link active p-3" id="calendar-tab" 
         data-bs-toggle="tab" data-bs-target="#calendar-tab-pane" type="button" 
         role="tab" aria-controls="calendar-tab-pane" aria-selected="true">
         시간으로 보기</a>
    </li>
    <li class="nav-item">
      <a class="nav-link p-3" id="calendar-tab" 
         data-bs-toggle="tab" data-bs-target="#list-tab-pane" type="button" 
         role="tab" aria-controls="list-tab-pane" aria-selected="false" href="#">목록으로 보기</a>
    </li>
  </ul>

  <div class="tab-content" id="detailTabContent">
    <div class="tab-pane fade show active" id="calendar-tab-pane" role="tabpanel" aria-labelledby="calendar-tab" tabindex="0">
        <CelanderTab/>
    </div>
    <div class="tab-pane fade" id="list-tab-pane" role="tabpanel" aria-labelledby="list-tab" tabindex="0">..aa.</div>
    
  </div>


</div>
<style>
.nav-tabs .nav-link, .nav-tabs .nav-item.show .nav-link{
  color: rgba(var(--bs-primary-rgb)); 
  font-weight: 900;
  margin-top: 3px;
  margin-left: 3px;
}
</style>
