<script lang="ts">
  import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
  } from "@sveltestrap/sveltestrap";
  import webhook from "../../../application/webhook/webhook";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let isShow: boolean = false; 
  export let isEdit: boolean;
  // Information of the object being edited
  export let info: webhook;
  let title = isEdit ? "Edit" : "Add";
  let formData: webhook = {
    name: "",
    enabled: false,
    urlList: [],
  };
  let urlStr = "";
  const toggle = () => {
    if (isShow) {
      dispatch("closeD");
    }
  };
  function save() {
    console.log(100, urlStr);
    formData.urlList = urlStr.split("\n");
    console.log("formData", formData);
    dispatch("save", formData);
  }
// Listen to isShow, when the user selects edit, assign values to formData, and clear formData for new additions
  $: if (isShow) {
    if (!isEdit) {
      formData = {
        name: "",
        enabled: false,
        urlList: [],
      };
      urlStr = "";
    } else {
      let list = info.urlList.map((item) => item);
      formData = {
        ...info,
        urlList: list,
      };
      urlStr = list.join("\n");
    }
  }
</script>

<div>
  <Modal isOpen={isShow} {toggle} size="lg">
    <div class="title">{title} webhook</div>
    <ModalBody>
      <div class="bodyLayout">
        <div>
          <span>Name:</span>
          <input type="text" name="" bind:value={formData.name} />
        </div>
        <div>
          <span>Enabled:</span>
          <input type="checkbox" bind:checked={formData.enabled} />
        </div>

        <div class="urlBox">
          <span class="urlLabel">Url:</span>
          <textarea name="" id="" bind:value={urlStr}></textarea>
        </div>
        <div class="tips">Please enter each URL on a new line.</div>
      </div>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" on:click={save}>Save</Button>
      <Button color="secondary" on:click={toggle}>Cancel</Button>
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
    min-height: 300px;
    padding: 10px 20px;
  }
  .bodyLayout div {
    margin-bottom: 20px;
    font-weight: bold;
  }
  .bodyLayout input[type="text"],
  .bodyLayout textarea {
    width: 450px;
    padding: 5px 10px;
    border-radius: 5px;
    box-shadow: 0 1px 7px 0 #20212447;
    border-color: rgb(85, 85, 85);
  }
  .bodyLayout textarea {
    min-height: 150px;
  }
  .bodyLayout input[type="checkbox"] {
    transform: scale(1.5);
    margin-left: 10px;
  }
  .bodyLayout span {
    display: inline-block;
    width: 60px;
    text-align: right;
    margin-right: 10px;
  }

  .urlBox {
    display: flex;
  }
  .tips {
    font-size: 13px;
    color: red;
    text-align: center;
  }
</style>
