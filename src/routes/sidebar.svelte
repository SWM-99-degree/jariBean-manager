<script>
    import Fa from 'svelte-fa'
    import { page } from '$app/stores';
    import { faCalendarCheck, faCircle } from '@fortawesome/free-solid-svg-icons'
    
  </script>
<div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 ">
    <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100"
        style="margin-left:-20px">
        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            <li class="nav-item " class:active-menu={$page.url.pathname=='/'}>
                <a href="/" class="nav-link ms-4 align-middle px-0 fs-4 ">
                    <Fa  icon={faCalendarCheck} />  <span class="ms-1 text-black-50 d-none d-sm-inline">예약</span>
                </a>
            </li>
            <li class="nav-item" class:active-menu={$page.url.pathname=='/match'}>
                <a href="/match" class="nav-link align-middle fs-4 px-0">
                    <Fa class="text-light" icon={faCircle} /> <span class="ms-1 text-black-50 d-none d-sm-inline">매칭</span>
                </a>
            </li>
            <li class="nav-item" class:active-menu={$page.url.pathname=='/seat'}>
                <a href="/seat" class="nav-link align-middle fs-4 px-0">
                    <Fa class="text-light" icon={faCircle} /> <span class="ms-1 text-black-50 d-none d-sm-inline">좌석</span>
                </a>
            </li>
        </div>           
</div>
<style>
    .nav-item.active-menu{
        border-left: 3px solid  rgba(var(--bs-primary-rgb)) !important; 
     }
    .nav-item.active-menu span{
        color: rgba(var(--bs-primary-rgb)) !important; 
    }
    .nav-item.active-menu svg{
        color: rgba(var(--bs-primary-rgb)) !important;
    }
</style>
