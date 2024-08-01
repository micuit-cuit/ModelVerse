<script>
    import Header from "$components/menu/header.svelte";
    import {onMount} from "svelte";
    const page = [
        {name: "Accueil", url: "/"},
        {name: "Catégories", url: "/Catégories"},
        {name: "Produit", url: "/Produit"},
        {name: "crédit", url: "/credit"},
        {name: "Connexion avec Discord", url: "https://discord.com/oauth2/authorize?client_id=1268504553276313640&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Flogin&scope=identify+email", discord: true}
    ];
    onMount(() => {
            
        //récupérer le code de l'url
        let url = window.location.href;
        let code = url.split("code=")[1];
        //envoyer le code au serveur
        fetch("/api/login/"+code, {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(data => {
            console.log(data);
            //si c'est un succès, on enregistre le token dans le localstorage
            if(data.success){
                localStorage.setItem("token", data.token);
                localStorage.setItem("id", JSON.stringify(data.id));
                localStorage.setItem("username", data.global_name);
                localStorage.setItem("avatar", "https://cdn.discordapp.com/avatars/"+data.id+"/"+data.avatar+".png");
                localStorage.setItem("email", data.email);
                localStorage.setItem("locale", data.locale);
                let date = new Date();
                date.setSeconds(date.getSeconds() + data.expires_in);
                localStorage.setItem("expires", date);
                window.location.href = "/";
            }
        });
    });
</script>
<Header items={page}/>

