<script>
    import Button from "../gui/button.svelte";
    export let title = "Title";
    export let data = [];/*
    [
        {type: "p", content: "Description du produit..."},
        {type: "button", content: "Acheter", url: "/Acheter"}
    ];*/
    export let img= "";
    export let imgData = {
        position: "left",//left, right
        height: "100%",
        width: "100%",
        borderRadius: "30px",
        type:"img"//ifraime, img
    }
</script>
<div id="contentDiv">
    {#if title != ""}
        <h1>{title}</h1>
    {/if}
    <div id="content" style="justify-content: {img ? "flex-start" : "center"};">
        {#if img && imgData.position == "left"}
            <div id="img" style="width: {imgData.size}; height: {imgData.size};">
                <img src={img} alt="img" style="width: 100%; border-radius: {imgData.borderRadius};"/>
            </div>
        {/if}
        {#if data.length > 0}
            <div id="data" style="width: {imgData.position == "left" ? "50%" : "100%"};text-align: {img ? (imgData.position == "left" ? "left" : "right") : "center"};">
                {#each data as item}
                    {#if item.type == "button"}
                        <Button title={item.content} url={item.url}/>
                    {:else}
                        {@html `<${item.type}>${item.content}</${item.type}>`}
                    {/if}
                {/each}
            </div>
        {/if}
        {#if img && imgData.position == "right"}
            <div id="img" style="width: {imgData.size}; height: {imgData.size};">
                <img src={img} alt="img" style="width: 100%; border-radius: {imgData.borderRadius};"/>
            </div>
        {/if}
    </div>
</div>
<style>
    h1{
        color: var(--text-color-secondary);
        text-align: center;
    }
    #contentDiv{
        margin: 20px;;
        padding: 50px;
        border-radius: 30px;
        color: var(--text-color-secondary);
        background: var(--color-gradient);
        box-shadow: var(--box-shadow);
        transition: background-color var(--theme-transition), color var(--theme-transition);
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
    #content{
        display: flex;
    }
    #data{
        margin: 20px;
    }
    #img{
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>