<script>
  import { cafe } from "../store/cafe";
  import { apiCall } from '../communal/communalMethod'

  let cafeId

  if (typeof window !== 'undefined') {
    // Perform localStorage action
    cafeId = localStorage.getItem('cafeId')
  }

  const response = apiCall("/cafe/" + cafeId + "/summary", "GET", null);
  response
    .then(data => {
      $cafe = data.data
    })
    .catch(error => {
      console.log("error : " + error);
    })


  let matchOpen = false;
  $: console.log(matchOpen);
</script>

<nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0">JB-ADMIN</div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="mb-2 mb-lg-0 form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            bind:checked={matchOpen}
          />
          <label class="form-check-label" for="flexSwitchCheckDefault"
            >매칭 대기중</label
          >
        </div>
      </div>
      <div class="d-flex" role="">
        <div class="row g-0">
          <div class="col">
            <h5 class="card-title text-end fs-5">{$cafe.name}</h5>
            <p class="card-text text-end fs-6">Open</p>
          </div>
          <div class="col-md-3 ms-3">
            <img
              alt="profile"
              class="rounded-circle mt-1"
              src={$cafe.imageUrl}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
