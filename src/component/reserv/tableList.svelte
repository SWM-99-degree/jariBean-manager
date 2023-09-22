<script>
  import { page } from "$app/stores";
  import Fa from "svelte-fa";
  import { faImage } from "@fortawesome/free-solid-svg-icons";
  import selectdTable from "../../store/reserv.js";

  import { storeTableClassList } from "../../store/cafe.js";

  import {storeName, storeSeating, height, shape, concent, backrest} from "../../store/tableClass.js"
  import SeatAddModal from "../seat/seatAddModal.svelte";

  let showPopup = false;

  const onShowPopup = (event) => {
    showPopup = true;
  };

  const onPopupClose = (data) => {
    showPopup = false;
  };
  
  let curret_table = 0;

  function handleClick(arrNum) {
    curret_table = arrNum;
    selectdTable.set($storeTableClassList[arrNum]);
  }


</script>

<div class="table_list card p-3">
  <h4>테이블 종류</h4>
  <p>{$height}</p>
  {#each $storeTableClassList as tableClass, i}
    <div
      class=" card mb-3 border-0 bg-light p-1"
      class:active={curret_table === i}
    >
      <div class="row g-0">
        <div class="col-md-3">
          <div
            class="m-3 bg-white rounded-circle position-relative"
            role="button"
            on:click={() => handleClick(i)}
            style="width: 70px;height:70px"
          >
            {#if tableClass.name}
              <img
                class="rounded-circle"
                style="width: 70px;"
                src={tableClass.image}
                alt={tableClass.name}
              />
            {:else}
              <Fa
                class="text-light position-absolute top-50 start-50 translate-middle"
                icon={faImage}
                size="2x"
              />
            {/if}
          </div>
        </div>
        <div class="col-md-9">
          <div class="card-body ms-1">
            <h5
              class="card-title fw-bold"
              role="button"
              on:click={() => handleClick(i)}
            >
              {tableClass.name}
            </h5>
            <p class="card-text text-black-50 fw-bold">
              <span>&#183;&nbsp;{tableClass.seating}인&nbsp;</span>
              {#each tableClass.tableOptionList as att}
                <span>&#183;&nbsp;{att}&nbsp;&nbsp;</span>
              {/each}
            </p>
          </div>
        </div>
      </div>
    </div>
  {/each}

  <!-- 테이블 클래스 추가 버튼 -->
  <button
    type="button"
    class="btn btn-primary btn-lg text-white fw-bold"
    style="background-color: #F8963E;"
    on:click={onShowPopup}>테이블 클래스 추가
  </button>
  <SeatAddModal open={showPopup} onClosed={(data) => onPopupClose(data)}>
    <h2 style="text-align: center;">테이블 클래스 추가</h2>

    <h5>이름</h5>
    <div class="input-group-lg mb-3">
      <input type="text" class="form-control" placeholder="이름" aria-label="이름" aria-describedby="basic-addon1" bind:value={$storeName}>
    </div>

    <h5>인원</h5>
    <div class="input-group-lg mb-3">
      <input type="text" class="form-control" placeholder="인원" aria-label="인원" aria-describedby="basic-addon1" bind:value={$storeSeating}>
    </div>

    <h5 style="margin-top: 10px;">책상 높이</h5>
    <div class="btn-group" role="group" aria-label="Basic radio toggle button group" style="margin: 3px;">
      <input type="radio" class="btn-check" name="btnradio1" id="btnradio1" bind:value={$height} on:change={() => {$height = "HEIGHT"}} checked>
      <label class="btn btn-outline-primary" for="btnradio1">낮은 책상</label>
    
      <input type="radio" class="btn-check" name="btnradio1" id="btnradio2" bind:value={$height} on:change={() => {$height = undefined}}>
      <label class="btn btn-outline-primary" for="btnradio2">높은 책상</label>
    </div>
    

    <h5 style="margin-top: 10px;">책상 모양</h5>
    <div class="btn-group" role="group" aria-label="Basic radio toggle button group" style="margin: 3px;">
      <input type="radio" class="btn-check" name="btnradio2" id="btnradio3" bind:value={$shape} on:change={() => {$shape = "RECTANGLE"}} checked>
      <label class="btn btn-outline-primary" for="btnradio3">사각형 책상</label>
    
      <input type="radio" class="btn-check" name="btnradio2" id="btnradio4" bind:value={$shape} on:change={() => {$shape = undefined}}>
      <label class="btn btn-outline-primary" for="btnradio4">원형 책상</label>
    </div>
    

    <h5 style="margin-top: 10px;">콘센트</h5>
    <div class="btn-group" role="group" aria-label="Basic radio toggle button group" style="margin: 3px;">
      <input type="radio" class="btn-check" name="btnradio3" id="btnradio5" bind:value={$concent} on:change={() => {$concent = "PLUG"}} checked>
      <label class="btn btn-outline-primary" for="btnradio5">콘센트 있음</label>
    
      <input type="radio" class="btn-check" name="btnradio3" id="btnradio6" bind:value={$concent} on:change={() => {$concent = undefined}}>
      <label class="btn btn-outline-primary" for="btnradio6">콘센트 없음</label>
    </div>
    

    <h5 style="margin-top: 10px;">등받이</h5>
    <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
      <input type="radio" class="btn-check" name="btnradio4" id="btnradio7" bind:value={$backrest} on:change={() => {$backrest = "BACKREST"}} checked>
      <label class="btn btn-outline-primary" for="btnradio7">등받이 있음</label>
    
      <input type="radio" class="btn-check" name="btnradio4" id="btnradio8" bind:value={$backrest} on:change={() => {$backrest = undefined}}>
      <label class="btn btn-outline-primary" for="btnradio8">등받이 없음</label>
    </div>
    
  </SeatAddModal>
</div>

<style>
  span {
    display: block;
    float: left;
  }
  .table_list .active {
    background: rgba(var(--bs-primary-rgb)) !important;
    color: white !important;
  }
  .table_list .active span {
    color: white !important;
    font-weight: 500;
  }
</style>
