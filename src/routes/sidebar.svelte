<script>
    import Fa from "svelte-fa";
    import { page } from "$app/stores";
    import {
        faCalendarCheck,
        faCircle,
    } from "@fortawesome/free-solid-svg-icons";
    import { Queue, matching } from "../store/requestQueue";
    import { progressing } from "../store/matching";
    import currentToken from "../store/firebase";
    import { onMount } from "svelte";
    import { initializeApp } from "firebase/app";
    import { getMessaging, getToken, onMessage } from "firebase/messaging";
    import MatchingAddModal from '../component/matchingAddModal.svelte';
    


    const firebaseConfig = {
        apiKey: "AIzaSyCRGiwGkiatM1kHnKWfd0tXceWHWJxiWRA",
        authDomain: "jaribean-3af6f.firebaseapp.com",
        projectId: "jaribean-3af6f",
        storageBucket: "jaribean-3af6f.appspot.com",
        messagingSenderId: "508384819940",
        appId: "1:508384819940:web:f14eda8ab95a047e19caf1",
        measurementId: "G-CQJ8KGXR9L",
    };

    let userId;
    let number;
    let token;

    onMount(async () => {
        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);
        await getToken(messaging, {
            vapidKey:
                "BMfsY5QIeibkEKjH0O_oQxIQMaKLWX5gmYk3K_Lr9WnkT9059twffrB6lFkZRfDxJT6t80DEaawUJIc4RIiqnio",
        })
            .then((token) => {
                if (token) {
                    console.log(token);
                    token = token;
                    currentToken.set(token);
                } else {
                    console.log(
                        "No registration token available. Request permission to generate one."
                    );
                }
            })
            .catch((err) => {
                console.log("An error occurred while retrieving token. ", err);
            });

        if (token) {
            console.log(token);
            sendTokenToServer(token);
        } else {
            setTokenSentToServer(false);
        }

        onMessage(messaging, (payload) => {
            console.log("Message received. ", payload);
            if (payload.data.type === "matchingRequest") {
                Queue.enqueue(payload.data.userId, payload.notification.peopleNumber);
                checkingTab();
            } else if (payload.data.type === "matchingCancelBeforeMatching"){
                progressing.dequeue(payload.data.userId);
            } else if (payload.data.type === "matchingCancelAfterMatching") {
                progressing.cancel(payload.data.userId);
            } else if (payload.data.type === "matchingComplete") {
                progressing.complete(payload.data.userId);
            }
        });

    });
    function sleep(ms) {
        const wakeUpTime = Date.now() + ms;
        while (Date.now() < wakeUpTime) {}
    }

    function checkingTab(){
        while (Queue.isempty() == false)  {
            Queue.dequeue();
            let q;
            matching.subscribe((obj)=> q = obj)
            console.log(q);
            userId = q.userid;
            number = q.number;
            while (showPopup) {
                sleep(1000)
                continue;
            }
            onShowPopup();
            console.log("loof end");
        }
    }
    

    function sendTokenToServer(currentToken) {
        if (!isTokenSentToServer()) {
            console.log("Sending token to server...");
            // TODO(developer): Send the current token to your server.
            setTokenSentToServer(true);
        } else {
            console.log("Token already available in the server");
        }
    }

    function isTokenSentToServer() {
        return window.localStorage.getItem("sentToServer") === "1";
    }

    function setTokenSentToServer(sent) {
        window.localStorage.setItem("sentToServer", sent ? "1" : "0");
    }

    let showPopup = false;

	const onShowPopup = (event) => {
		showPopup = true;
	}

	const onPopupClose = (data) => {
		showPopup = false;
		console.log(data);
	}

    checkingTab()
</script>

<div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
    <MatchingAddModal  open={showPopup} onClosed={(data) => onPopupClose(data)} userId={userId} number={number}>
      <h2 style="text-align: center;">매칭 요청이 들어왔습니다</h2>
      <div style="text-align: center;">
        고객 아이디 : {userId} <br>
        인원 수 : {number} 명
      </div>
	</MatchingAddModal>


    <div
        class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100"
        style="margin-left:-20px"
    >
        <ul
            class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
        >
            <li
                class="nav-item"
                class:active-menu={$page.url.pathname == "/management/reserve"}
            >
                <a
                    href="/management/reserve"
                    class="nav-link ms-4 align-middle px-0 fs-4"
                >
                    <Fa icon={faCalendarCheck} />
                    <span class="ms-1 text-black-50 d-none d-sm-inline"
                        >예약</span
                    >
                </a>
            </li>
            <li
                class="nav-item"
                class:active-menu={$page.url.pathname == "/management/match"}
            >
                <a
                    href="/management/match"
                    class="nav-link align-middle fs-4 px-0"
                >
                    <Fa class="text-light" icon={faCircle} />
                    <span class="ms-1 text-black-50 d-none d-sm-inline"
                        >매칭</span
                    >
                </a>
            </li>
            <li
                class="nav-item"
                class:active-menu={$page.url.pathname == "/management/seat"}
            >
                <a
                    href="/management/seat"
                    class="nav-link align-middle fs-4 px-0"
                >
                    <Fa class="text-light" icon={faCircle} />
                    <span class="ms-1 text-black-50 d-none d-sm-inline"
                        >좌석</span
                    >
                </a>
            </li>
        </ul>
    </div>
</div>

<style>
    .nav-item.active-menu {
        border-left: 3px solid rgba(var(--bs-primary-rgb)) !important;
    }
    .nav-item.active-menu span {
        color: rgba(var(--bs-primary-rgb)) !important;
    }
    .nav-item.active-menu svg {
        color: rgba(var(--bs-primary-rgb)) !important;
    }
</style>
