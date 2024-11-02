<!-- Parameter input pop-up component -->
<script lang="ts">
    import {
      Button,
      Modal,
      ModalBody,
      ModalFooter,
    } from "@sveltestrap/sveltestrap";
    import { createEventDispatcher } from "svelte";
  
    const dispatch = createEventDispatcher();
    export let showTrigger: boolean = false; 
    export let id:String; 
    const cancel = () => {
      if (showTrigger) {
        dispatch("closeDTrigger");
      }
    };
    function trigger() {
        fetch("/api/trigger", {
         method: 'POST',
        body: JSON.stringify({ id, params : JSON.parse(params) }),
      })
        .then((response) => response.json())
        .then((data) => {
            alert('Call Webhook:  \n' + data.join("\n"))
            dispatch("closeDTrigger");
        });
    }
    let params='{ "token": "" }'
    // Listen for whether the pop-up is open, and if it is open, reset the params
    $: if (showTrigger) {
     params='{ "token": "" }'
    }
  </script>
  
  <div>
    <Modal isOpen={showTrigger} {cancel}>
      <div class="title">Edit Params</div>
      <ModalBody>
        <div class="bodyLayout">
          <div>
            <span>Params:  </span>
            <textarea class="myTextarea" bind:value={params}></textarea>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" on:click={trigger}>Trigger Webhook</Button>
        <Button color="secondary" on:click={cancel}>Cancel</Button>
      </ModalFooter>
    </Modal>
  </div>

  <style scoped>
    .title {
      font-size: 20px;
      padding: 20px 30px;
      font-weight: bold;
    }
    .bodyLayout {
      min-height: 150px;
      padding: 10px 20px;
    }
    .bodyLayout div {
      margin-bottom: 20px;
      font-weight: bold;
      display: flex;
    }
    .myTextarea
    {
        margin-left: 10px;
        width: 400px;
        min-height: 100px;
    }
  </style>
  