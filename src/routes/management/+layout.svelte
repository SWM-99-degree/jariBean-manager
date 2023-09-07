<script lang="ts">
import "../../app.scss";
import GoogleFont, { getFontStyle } from "@svelte-web-fonts/google";
import type { GoogleFontDefinition, GoogleFontVariant } from "@svelte-web-fonts/google";

import NavBar from "../nav.svelte";
import Sidebar from "../sidebar.svelte";


const fonts: GoogleFontDefinition[] = [
    {
        family: "Noto Sans Korean",
        variants: [
            "200"
        ],
    }
];



</script>
<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <GoogleFont fonts="{fonts}" display="swap" />
</svelte:head>
<NavBar/>
<div class="container-fluid">
    <div class="row ">
        <Sidebar/>
        <div class="col py-3  bg-secondary">
            <slot></slot>
        </div>
    </div>
</div>


