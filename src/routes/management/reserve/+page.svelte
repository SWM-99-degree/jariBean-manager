<script>
// @ts-nocheck

    import TableList from "../../../component/reserv/tableList.svelte";
    import TableDetail from "../../../component/reserv/tableDetail.svelte";
    import {apiCall} from "../../../communal/communalMethod"
    import selectdTable from "../../../store/reserv";
    import { storeTableClassList } from "../../../store/cafe";

    // table-class list 내용 조회
    let cafeId;
    if (typeof window !== "undefined") {
        cafeId = localStorage.getItem("cafeId");
    }

    const response = apiCall("/manager/table-class/" + cafeId, "GET", null);
    response
        .then((data) => {
            $storeTableClassList = data.data
            selectdTable.set($storeTableClassList[0]);
        })
        .catch((error) => {
            console.log("src > routes> management > reserve > +page.svelte > 테이블 클래스 조회: " + error);
        });

</script>

<div class="row">
    <div class="col-md-3">
        <TableList/>
    </div>
    <div class="col-md-9">
        <TableDetail/>
    </div>
</div>