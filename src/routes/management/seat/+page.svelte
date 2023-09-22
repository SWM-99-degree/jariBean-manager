<script>
    import { apiCall } from "../../../communal/communalMethod";
    import TableList from "../../../component/reserv/tableList.svelte";
    import TableDetail from "../../../component/seat/tableDetail.svelte";
</script>

<div class="row">
    <div class="col-md-3 h-100 d-inline-block">
        <TableList />
    </div>
    <div class="col-md-9">
        <TableDetail/>
    </div>
</div>
