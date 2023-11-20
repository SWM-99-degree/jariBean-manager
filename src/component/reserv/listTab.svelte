<script>
    import Fa from "svelte-fa";
    import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
    import { faImage } from "@fortawesome/free-solid-svg-icons";
    import { apiCall } from "../../communal/communalMethod";
    import selectdTable from "../../store/reserv"
    

    let currentDate = new Date();
    let reserveList = []

    selectdTable.subscribe((tc) => {
        const response = apiCall("/manager/reserve/" + tc.id, "GET", null);
        response
            .then((data) => {
                reserveList = Object.values(data.data).flat()
            })
            .catch((error) => {
                console.log("error: " + error);
            });
    });

    function convertToTime(startTime, endTime) {
        return startTime.split("T")[1].substring(0, 5)+ " ~ " + startTime.split("T")[1].substring(0, 5)
    }


</script>

<h5 class="text-center fw-bold text-black-50">
    <Fa class="" icon={faCalendarDays} />
    {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월 {currentDate.getDate()}일
</h5>

{#each reserveList as reserve}
    <div class="card" style="margin: 8px;">
        <div class="card-body">
            <div class="row">
                <div class="col-2">
                    <div class="m-3 bg-white rounded-circle position-relative" role="button" style="width: 70px;height:70px">
                    {#if reserve}
                        <img class="rounded-circle" style="width: 70px; height: 70px" src={reserve.name} alt={reserve.name}/>
                    {:else}
                        <Fa class="text-light position-absolute top-50 start-50 translate-middle" icon={faImage} size="2x"/>
                    {/if}
                    </div>
                </div>
                <div class="col container">
                    <div class="text"><b>{reserve.username}</b>  |  {reserve.tableName}</div>
                    <div class="text">{convertToTime(reserve.startTime, reserve.endTime)}</div>
                </div>
            </div>
        </div>
    </div>
{/each}

<style>
    
</style>