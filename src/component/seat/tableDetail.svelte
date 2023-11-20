<script>
    import { faImage } from "@fortawesome/free-solid-svg-icons";
  import { apiCall } from "../../communal/communalMethod.js";
  import selectdTable from "../../store/reserv.js";
    import Fa from "svelte-fa";

  let tableClass = {};
  let tableList = [];
  
  selectdTable.subscribe((tableItems) => {
    tableClass = tableItems;
    const response = apiCall("/manager/table/" + tableClass.id, "GET", null);
    response
      .then((data) => {
        tableList = data.data;
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  });
</script>

{#if tableClass}
  <div class="card p-3">
    <h4>{tableClass.name}</h4>
    <ul class="p-0 m-1">
      <li class="badge mx-1 fs-6 text-dark text-gray bg-light rounded-pill">
        {tableClass.seating}인
      </li>
      <!-- {#each table.tableOptionList as attr}
      <li class="badge mx-1 fs-6 text-dark text-gray bg-light rounded-pill">
        {attr}
      </li>
    {/each} -->
    </ul>
    <ul class="nav nav-tabs my-3" id="detailTab" role="tablist">
      <div class="tab-content" id="detailTabContent">
        <div
          class="tab-pane fade show active"
          id="calendar-tab-pane"
          role="tabpanel"
          aria-labelledby="calendar-tab"
          tabindex="0"
        />
        {#each tableList as table}
          <div
            class=" card mb-3 border-0 bg-light p-1"
          >
            <div class="row g-0">
              <div class="col-md-3">
                <div
                  class="m-3 bg-white rounded-circle position-relative"
                  style="width: 70px;height:70px"
                >
                  {#if table.image}
                    <img
                      class="rounded-circle"
                      style="width: 70px; height: 70px"
                      src={table.image}
                      alt={table.image}
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
                    class="card-title fw-bold">
                    {table.name}
                  </h5>
                  <h6
                    class="card-title fw-bold">
                    {table.description}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        {/each}
        <div
          class="tab-pane fade"
          id="list-tab-pane"
          role="tabpanel"
          aria-labelledby="list-tab"
          tabindex="0"
        />
      </div>
    </ul>
  </div>
{/if}

<style>
  .nav-tabs .nav-link,
  .nav-tabs .nav-item.show .nav-link {
    color: rgba(var(--bs-primary-rgb));
    font-weight: 900;
    margin-top: 3px;
    margin-left: 3px;
  }
</style>
