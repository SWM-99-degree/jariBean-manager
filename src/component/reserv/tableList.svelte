<script>
	
  import { page } from '$app/stores';
  import Fa from 'svelte-fa'
  import { faImage } from '@fortawesome/free-solid-svg-icons'
  import selectdTable from '../../store/reserv.js'

  //use only '/seat'
  import SeatAddModal from '../seat/seatAddModal.svelte';
  let showPopup = false;

	const onShowPopup = (event) => {
		showPopup = true;
	}

	const onPopupClose = (data) => {
		showPopup = false;

		console.log(data);
	}
  //----use only '/seat'


  let curret_table= 0
    let tables =[
        {"title": "스터디용1",
         "number": "2인",
         "attribute" : ["콘센트", "사각형책상", "높은책상"],
         "src": "https://picsum.photos/id/7/80/80"
        },
        {"title": "스터디용2",
         "number": "5인",
         "attribute" : ["콘센트", "사각형책상", "높은책상"]
        },
        {"title": "회의용1",
         "number": "8인",
         "attribute" : ["콘센트", "사각형책상", "높은책상"]
        },
    ]
    selectdTable.set(tables[0])
    
        
    function handleClick(arrNum){
      curret_table = arrNum;
      selectdTable.set(tables[arrNum])
    }
</script>
<div class="table_list card p-3">
    <h4>테이블 종류</h4>    
    {#each  tables as table,i }
    <div class=" card mb-3 border-0 bg-light p-1"  class:active={curret_table === i} >
        <div class="row g-0">
          <div class="col-md-3">
            <div class="m-3 bg-white rounded-circle position-relative " role="button"  on:click={() => handleClick(i)} style="width: 70px;height:70px">
                {#if table.src}
                    <img class="rounded-circle" style="width: 70px;" src={table.src} alt={table.title}>
                {:else}
                    <Fa class="text-light position-absolute top-50 start-50 translate-middle" icon={faImage} size="2x"/> 
                {/if}
            </div>
          </div>
          <div class="col-md-9 ">
            <div class="card-body ms-1">
              <h5 class="card-title fw-bold" role="button"  on:click={() => handleClick(i)}>{table.title}</h5>
              <p class="card-text text-black-50 fw-bold">
                <span>&#183;&nbsp;{table.number}&nbsp;</span>
                {#each  table.attribute as att }
                    <span>&#183;&nbsp;{att}&nbsp;&nbsp;</span>
                {/each}
              </p>
              <!--<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>-->
            </div>
          </div>
        </div>
      </div>
    {/each}
    {#if $page.url.pathname== '/seat'}
    <button type="button" class="btn btn-primary btn-lg text-white fw-bold"  on:click={onShowPopup}>테이블 종류 추가</button>
    <SeatAddModal  open={showPopup} onClosed={(data) => onPopupClose(data)} >
      <h2>Testing</h2>
		</SeatAddModal>
    {/if}
</div>      

<style>
span{
    display:block;
    float:left;
}
.table_list .active{
  background: rgba(var(--bs-primary-rgb)) !important; 
  color: white !important;
}
.table_list .active span{
  color: white !important;
  font-weight: 500;
}
</style>