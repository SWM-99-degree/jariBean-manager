<script>
    import { fade, fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";
  
    export let open = false;
    export let showBackdrop = true;
    export let onClosed;
    export let title = '매칭 요청';
    export let userId;
    export let number;
  
    const modalClose = (data) => {
      open = false;
      if (onClosed) {
        onClosed(data);
      }

      if (data === 'save'){
        sendDeleteRequest()
      }
    }

    async function sendDeleteRequest() {
      const data = {
          'peopleNumber' : Number(number),
          'userId' : userId
        };
      const response = await fetch('url', {
        method : 'POST',
        headers : {
          'Content-Type': 'application/json',
          'ACCESS_AUTHORIZATION' : '',
        },
        body : JSON.stringify(data)
      });
      if (response.ok) {
        const data = await response.json(); // JSON 응답을 파싱
        console.log('서버 응답:', data);
        // 여기에서 추가로 처리할 내용을 작성할 수 있습니다.
      } else {
        sendDeleteRequest()
        throw new Error('매칭 요청 실패');
      }
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
            <button type="button" class="btn btn-secondary" data-dismiss="modal" on:click={() => modalClose('close')}>거절</button>
            <button type="button" class="btn btn-primary" on:click={() => modalClose('save')}>수락</button>
          </div>
        </div>
      </div>
    </div>
    {#if showBackdrop}
      <div class="modal-backdrop show" transition:fade={{ duration: 500 }} />
    {/if}
  {/if}
  
  <style>
    .h2 {
      text-align: center;
    }
    .modal {
      display: block;
    }
  </style>