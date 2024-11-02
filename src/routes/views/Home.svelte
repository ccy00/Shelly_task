<script lang="ts">
    import { onMount } from "svelte";
    import webhook from "../../application/webhook/webhook";
    import { Table ,Button   } from "@sveltestrap/sveltestrap";
    import Action from './components/Action.svelte';
    import TriggerDialog from './components/triggerDialog.svelte';

    let column:string[]=['Name','Status',"Urls","Operation"]
    let webhooklist: webhook[] = [];
  
    onMount(async () => {
      getList();
    });

    function getList() {
      fetch("/api/webhook")
        .then((response) => response.json())
        .then((data) => {
          webhooklist = data;
        });
    }
    // Control the display of add/edit pop-up windows
    let isShow=false
    let isEdit=false
    let info:webhook={
      name:'',
      enabled:false,
      urlList:[]
    }
    // Initiate an add/edit request
    function save(event:any) {
      console.log('event',event)
      let method=isEdit?'PUT':'POST'
      fetch("/api/webhook", {
        method,
        body: JSON.stringify(event.detail),
      })
        .then((response) => response.json())
        .then((data) => {
          isShow=false
          getList()
        });
    }
    // Popup control, when the flag is true it represents editing, otherwise it represents adding
    function actions(flag:boolean,item?:webhook)
    {
      console.log(flag)
      isShow=true
      isEdit=flag

      if(isEdit){
      info=item!
      }
    }

    function deleteItem (id:String)
    {
      fetch("/api/webhook", {
        method: 'DELETE',
        body: JSON.stringify({id}),
      })
      .then(()=>{
        getList()
      })
    }
    // Control the display of parameter input pop-up windows
    let showTrigger=false
    let id='' //Store the webhook ID to be triggered
    function trigger(webhookId:string='')
    {
      showTrigger=true
      id=webhookId
    }

    function closeDTriggerFunction()
    {
      showTrigger=false
    }
</script>

<div class="container">
  <Button style="color:white" on:click={() => actions(false)} color="info"
    >Add</Button
  >
  <Table>
    <thead>
      <tr>
        {#each column as C}
          <th>{C}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each webhooklist as item}
        <tr>
          <td>{item.name}</td>
          <td>
            <div class="tips" style:background-color={item.enabled ? "#0d6efd" : "#6c757d"}>
              {item.enabled ? "Enabled" : "Disabled"}
            </div>
          </td>
          <td>
            {#each item.urlList as url}
              <div>{url}</div>
            {/each}
          </td>
          <td>
            <Button on:click={() => actions(true, item)} outline  color="primary">Edit</Button >
            <Button on:click={() => deleteItem(item.id!)} color="danger" style="margin-right: 20px;margin-left: 20px;">Del</Button>
            <Button on:click={() => trigger(item.id)} color="danger">Trigger</Button>
          </td>
        </tr>
      {/each}
    </tbody>
  </Table>
</div>
<Action {isShow} {isEdit} {info} on:closeD={() => {  isShow = false;}}  on:save={save}/>
<TriggerDialog {showTrigger}    {id}  on:closeDTrigger={closeDTriggerFunction} />

<style>
  .container {
    width: 80%;
    margin: 10vh auto;
    box-shadow: 0 1px 7px 0 #20212447;
    border-radius: 5px;
    padding-top: 20px;
  }

  .tips {
    border-radius: 5px;
    height: 30px;
    padding: 3px 5px;
    width: 80px;
    text-align: center;
    color: white;
  }
</style>
