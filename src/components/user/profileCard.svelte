<script>
    export let image = "/imageProfle/default.svg";
    export let name = "John Doe";
    export let description = "description";
    export let email = "email";
    export let id = "id";
    let active = false;
</script>

<style>
    img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    #card{
        border-radius: 10px;
        border: 1px solid var(--border-color);
        height: 120px;
        width: 300px;
    }
    #content{
        display: flex;
        padding: 10px;
        height: 100%;
    }
    #profile{
        padding-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-wrap: wrap;
    }
</style>

<div id="card" on:click={() => active = !active}>
    <div id="content">
        <img src={image} alt="profile picture">
        <h1>{name}</h1>
        {#if active}   
            <div id="profile">
                <p>{description}</p>
                <p>{email}</p>
                <p>@{id}</p>
            </div>
        {/if}
    </div>
</div>