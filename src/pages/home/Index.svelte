<script>
  import LipsumComponent from "../../components/lipsum/LipsumComponent.svelte";
  import {fade} from 'svelte/transition'
</script>

<div class="content" in:fade="{{duration: 500}}">
  <LipsumComponent />

</div>