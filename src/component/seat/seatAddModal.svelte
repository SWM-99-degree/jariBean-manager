<script>
  import { fade, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { apiCall } from "../../communal/communalMethod"
  import { storeName, storeSeating, height, shape, concent, backrest } from "../../store/tableClass"
  import { cafe } from "../../store/cafe";
    import { subscribe } from "svelte/internal";

  export let open = false;
  export let showBackdrop = true;
  export let onClosed;
  export let title = 'Modal title';

  const modalClose = (data) => {
    open = false;
    if (onClosed) {
      onClosed(data);
    }
  }

  let name = '';
  let seating = 0;

  storeName.subscribe(value => {
    name = value;
  })
  storeSeating.subscribe(value => {
    seating = value;
  })

  function createTableClass() {
    let option = [$height, $shape, $concent, $backrest].filter(value => value !== undefined && value !== '')
    const response = apiCall("/manager/tableclass/" + $cafe.id, "POST", { name, seating, option})
    response
      .then((data) => {
          console.log("success");
          open = false
      })
      .catch((error) => {
          console.log("error: " + error);
          open = false
      });
  }



  
  </script>
  
  {#if open}
    <div class="modal" id="sampleModal" tabindex="-1" role="dialog" aria-labelledby="sampleModalLabel" aria-hidden={false}>
      <div class="modal-dialog" role="document" in:fly={{ y: -50, duration: 300 }} out:fly={{ y: -50, duration: 300, easing: quintOut }}>
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="sampleModalLabel">{title}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" on:click={() => modalClose('close')}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" on:click={() => modalClose('close')}>취소</button>
            <button type="button" class="btn btn-primary" on:click={() => createTableClass()}>추가</button>
            <!-- <button type="button" class="btn btn-primary" on:click={() => modalClose('save')}>추가</button> -->
          </div>
        </div>
      </div>
    </div>
    {#if showBackdrop}
      <div class="modal-backdrop show" transition:fade={{ duration: 500 }} />
    {/if}
  {/if}
  
  <style>
    .modal {
      display: block;
    }
  </style>