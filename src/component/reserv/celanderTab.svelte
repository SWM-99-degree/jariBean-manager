<script>
  import TimeCell from "./timeCell.svelte";
  // @ts-nocheck
  import Fa from "svelte-fa";
  import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
  import selectdTable from "../../store/reserv"
  import { apiCall } from "../../communal/communalMethod";

  const colorList = ["#FF9696", "#9585F7", "#75DFAC", "#FFB26D"]
  const bgColorList =["#fce4e4", "#e8e4fe", "#deffef", "#fff0dc"]
  let reserveList = new Map();
  let tableIdList = [];

  selectdTable.subscribe((tc) => {
    console.log("/manager/reserve/" + tc.id);
    const response = apiCall("/manager/reserve/" + tc.id, "GET", null);
    response
        .then((data) => {
            reserveList = data.data
            console.log(JSON.stringify(reserveList));
            tableIdList = Object.keys(reserveList);
        })
        .catch((error) => {
            console.log("error: " + error);
        });
  });

  let openTime = 9
  let closeTime = 20
  let currentDate = new Date();

  function convertTimeToNumber(time) {
    let hour = time.split('T')[1].split(':')[0];
    let minute = time.split('T')[1].split(':')[1];
    return Number(hour) + (minute === "30" ? 0.5 : 0)
  }

  function convertOpeningTimeToString(startTime, endTime) {
    return startTime.split('T')[1].substring(0, 5) + " ~ " + endTime.split('T')[1].substring(0, 5)
  }
  
</script>

<h5 class="text-center fw-bold text-black-50">
  <Fa class="" icon={faCalendarDays} />
  {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월 {currentDate.getDate()}일
</h5>

<table class="table table-borderless table-responsive">
  <thead class="text-center">
    <tr>
      <th scope="col" style="width: 70px;" />
      {#each tableIdList as tableId, idx}
        <th scope="col" class="border-bottom">
          <p class="rounded text-white py-1" style="background: {colorList[idx%4]};">
            {reserveList[tableId][0].tableName}
          </p>
        </th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each Array.from({ length: closeTime - openTime + 1 }, (_, i) => i + openTime) as n}
      <tr>
        <th scope="row"><p>{n}:00</p></th>
          {#each tableIdList as tableId, idx}
            <td>
            {#each reserveList[tableId] as reserve, i}
              <!-- <p>{convertTimeToNumber(reserve.startTime)}</p> -->
              {#if n == convertTimeToNumber(reserve.startTime)}
                <TimeCell background={bgColorList[idx%4]} border={colorList[idx%4]} name={reserve.username} time={convertOpeningTimeToString(reserve.startTime, reserve.endTime)}/>
              {/if}
              {#if convertTimeToNumber(reserve.startTime) < n && n < convertTimeToNumber(reserve.endTime) }
                <TimeCell background={bgColorList[idx%4]} border={colorList[idx%4]}/>
              {/if}
            {/each}
            </td>
          {/each}
      </tr>
      <tr>
        <th scope="row" />
          {#each tableIdList as tableId, idx}
            <td>
            {#each reserveList[tableId] as reserve, i}
              {#if n + 0.5 == convertTimeToNumber(reserve.startTime)}
                <TimeCell background={bgColorList[idx%4]} border={colorList[idx%4]} name={reserve.username} time={convertOpeningTimeToString(reserve.startTime, reserve.endTime)}/>
              {/if}
              {#if convertTimeToNumber(reserve.startTime) <= n && n+0.5 < convertTimeToNumber(reserve.endTime) }
                <TimeCell background={bgColorList[idx%4]} border={colorList[idx%4]}/>
              {/if}
            {/each}
            </td>
          {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table tbody th p {
    color: #999;
    margin-top: -17px;
  }
  table tbody td {
    height: 3rem;
    min-width: 180px !important;
    padding: 0;
  }
</style>
