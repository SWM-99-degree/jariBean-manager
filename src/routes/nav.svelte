<script>
  import { onMount } from "svelte";
  import { cafe } from "../store/cafe";
  import { apiCall } from "../communal/communalMethod";

  let matchOpen = false;
  let cafeId = "loading";
  let name = "loading..";
  let imageUrl = "loading..";

  onMount(async () => {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      cafeId = localStorage.getItem("cafeId");
    }

    const response = apiCall("/cafe/" + cafeId, "GET", null);
    const data = await response;

    $cafe = data.data;
    console.log(
      "[INFO] : https://api.jari-bean.com/api/cafe/" +
        cafeId +
        " 정보 조회에 성공하였습니다."
    );

    // .then(data => {
    //   $cafe = data.data
    //   console.log("[INFO] : https://api.jari-bean.com/api/cafe/" + cafeId + " 정보 조회에 성공하였습니다.");
    // })
    // .catch(error => {
    //   console.log("[ERROR] : https://api.jari-bean.com/api/cafe/" + cafeId + " 정보 조회에 실패하였습니다.");
    // })

    name = $cafe.cafeSummaryDto.name;
    imageUrl = $cafe.cafeSummaryDto.imageUrl;

    $: console.log(matchOpen);
  });
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
        <div class="row g-5">
          <div class="col">
            <h5 class="card-title text-end fs-5">{name}</h5>
            <p class="card-text text-end fs-6">Open</p>
          </div>
          <div class="col-md-3 ms-3">
            <img alt="profile" class="rounded-circle mt-1" src={imageUrl} />
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
