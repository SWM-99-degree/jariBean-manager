<script>
// @ts-nocheck

import TableList from "../../../component/reserv/tableList.svelte";
import TableDetail from "../../../component/reserv/tableDetail.svelte";
import manager from "../../../store/manager";


let manager_info ={
    cafeName : "엔젤리너스",
    cafeImg : "https://picsum.photos/40/40/"    
}


manager.set(manager_info)
</script>
<div class="row">
    <div class="col-md-3">
        <TableList/>
    </div>
    <div class="col-md-9">
        <TableDetail/>
    </div>
</div>