<script>
  import TimeCell from "./timeCell.svelte";
  // @ts-nocheck
  import Fa from "svelte-fa";
  import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

  let table_1 = [
    {
      time: "09:00~11:30",
      name: "김xx",
    },
    {
      time: "15:30~17:30",
      name: "박xx",
    },
  ];
  let table_2 = [
    {
      time: "10:00~11:00",
      name: "김xx",
    },
    {
      time: "14:00~15:00",
      name: "박xx",
    },
  ];

  let openTime = 9
  let closeTime = 20

  function convertTimeToNumber(time) {
    let [hour, minute] = time.split(":")
    return Number(hour) + (minute === "30" ? 0.5 : 0)
  }
  
</script>

<h5 class="text-center fw-bold text-black-50">
  <Fa class="" icon={faCalendarDays} />
  2023년 5월 5일
</h5>

<table class="table table-borderless table-responsive">
  <thead class="text-center">
    <tr>
      <th scope="col" style="width: 70px;" />
      <th scope="col" class="border-bottom">
        <p class="rounded text-white py-1" style="background: #FF9696;">
          테이블 1
        </p>
      </th>
      <th scope="col" class="border-bottom">
        <p class="rounded text-white py-1" style="background: #9585F7;">
          테이블 2
        </p>
      </th>
      <th scope="col" class="border-bottom">
        <p class="rounded text-white py-1" style="background: #75DFAC;">
          테이블 3
        </p>
      </th>
      <th scope="col" class="border-bottom">
        <p class="rounded text-white py-1" style="background: #FFB26D;">
          테이블 4
        </p>
      </th>
    </tr>
  </thead>
  <tbody>
    {#each Array.from({ length: closeTime - openTime + 1 }, (_, i) => i + openTime) as n}
      <!--  n:00~ n:30 -->
      <tr>
        <th scope="row"><p>{n}:00</p></th>
        <td>
          {#each table_1 as table}
            {#if n == convertTimeToNumber(table.time.split("~")[0])}
              <TimeCell background="#FFEAEA" border="#FF9696" name={table.name} time={table.time}/>
            {/if}
            {#if convertTimeToNumber(table.time.split("~")[0]) < n && n < convertTimeToNumber(table.time.split("~")[1]) }
              <TimeCell background="#FFEAEA" border="#FF9696"/>
            {/if}
          {/each}
        </td>
        <td>
          {#each table_2 as table}
            {#if n == Number(table.time.split("~")[0].split(":")[0])}
              <TimeCell background="#EBE7FF" border="#9585F7" name={table.name} time={table.time}/>
            {/if}
          {/each}
        </td>
        <td />
        <td />
      </tr>
      <!--//  n:00~ n:30 -->
      <!--  n:30~ n+1:00 -->
      <tr>
        <th scope="row" />
        <td>
          {#each table_1 as table}
            {#if n + 0.5 == convertTimeToNumber(table.time.split("~")[0])}
              <TimeCell background="#FFEAEA" border="#FF9696" name={table.name} time={table.time}/>
            {/if}
            {#if convertTimeToNumber(table.time.split("~")[0]) <= n && n+0.5 < convertTimeToNumber(table.time.split("~")[1])}
              <TimeCell background="#FFEAEA" border="#FF9696"/>
            {/if}
          {/each}
        </td>
        <td>
          {#each table_2 as table}
            {#if n + 1 == Number(table.time.split("~")[1].split(":")[0])}
              <TimeCell background="#EBE7FF" border="#9585F7" />
            {/if}
          {/each}
        </td>
        <td />
        <td />
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
