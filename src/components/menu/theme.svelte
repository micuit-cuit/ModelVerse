<script>
    import { onMount } from 'svelte';
    const cssVarsCorespondance = {};
//crée un code qui lit le fichier css et crée cssVarsCorespondance(il doit etre executé au build)
    onMount(detectCSSVars);
    function detectCSSVars() {
        fetch('/src/styles.css')
            .then((response) => response.text())
            .then((css) => {
                const cssVars = css.split('\\n').filter((line) => line.includes('--'));
                console.log(cssVars);
                cssVars.forEach((cssVar) => {
                    const cssVarName = cssVar.split(':')[0];
                    if (cssVarName.includes('light')) {
                        //remove the light or dark part of the css var name
                        let cssVarName = cssVar.replace('--light-', '').split(':')[0];
                        //supprime les espaces
                        cssVarName = cssVarName.replace(/\s/g, '');
                        cssVarsCorespondance[`--${cssVarName}`] = {
                            light: `var(--light-${cssVarName})`,
                            dark: `var(--dark-${cssVarName})`
                        };
                    }
                });
                console.log(cssVarsCorespondance);
            });
    }
    //regarde si le theme est dark ou light dans le local storage
    onMount(() => {
        //initialise le theme
        if (localStorage.getItem('theme') === null) {
            localStorage.setItem('theme', false);
        }else{
            // localStorage.setItem('theme', localStorage.getItem('theme') === 'true');
        }
        toggleTheme();
    });


    function toggleTheme() {
        let darkTheme = (localStorage.getItem('theme') === 'true');
        darkTheme = !darkTheme;
        if (darkTheme) {
            Object.keys(cssVarsCorespondance).forEach((key) => {
                document.documentElement.style.setProperty(key, cssVarsCorespondance[key].dark);
            });
            document.getElementById('day-night').checked = true;
        } else {
            Object.keys(cssVarsCorespondance).forEach((key) => {
                document.documentElement.style.setProperty(key, cssVarsCorespondance[key].light);
            });
            document.getElementById('day-night').checked = false;
        }
        localStorage.setItem('theme', darkTheme);
    }
</script>
  
<style>
.slider-container {
  display: block;
  width: 7rem;
  height: 3rem;
  border-radius: 1.5rem;
  overflow: hidden;
}
.slider-container .slider-inside {
  position: relative;
  width: 100%;
  height: 100%;
  box-shadow: inset 0.1rem 0.1rem 0.4rem rgba(0, 0, 0, 0.4);
  background-color: #2472B9;
  transition: background-color 0.5s ease-in-out;
}
.slider-container .slider-inside .sun-moon {
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
  background-color: #FDBF29;
  box-shadow: inset -0.05rem -0.1rem 0.1rem rgba(0, 0, 0, 0.5), inset 0.05rem 0.1rem 0.1rem rgba(255, 255, 255, 0.5), 0 0 0.2rem rgba(0, 0, 0, 0.4);
  transition-property: left, background-color;
  transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
}
.slider-container .slider-inside .sun-moon .moon-crater {
  background-color: #b1bac3;
  border-radius: 50%;
  position: absolute;
  box-shadow: inset 0.03rem 0.03rem 0.05rem rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}
.slider-container .slider-inside .sun-moon .moon-crater.size-1 {
  width: 0.9rem;
  height: 0.9rem;
  top: 1rem;
  left: 0.3rem;
}
.slider-container .slider-inside .sun-moon .moon-crater.size-2 {
  width: 0.65rem;
  height: 0.65rem;
  top: 0.4rem;
  left: 1.1rem;
}
.slider-container .slider-inside .sun-moon .moon-crater.size-3 {
  width: 0.5rem;
  height: 0.5rem;
  top: 1.5rem;
  left: 1.4rem;
}
.slider-container .slider-inside .light {
  position: absolute;
  left: 0.25rem;
  top: 0.25rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateX(calc(-50% + 1.25rem)) translateY(calc(-50% + 1.25rem));
  transition: left 0.5s ease-in-out, background-color 0.5s ease-in-out;
}
.slider-container .slider-inside .light.size-1 {
  width: 4.5rem;
  height: 4.5rem;
}
.slider-container .slider-inside .light.size-2 {
  width: 6.5rem;
  height: 6.5rem;
}
.slider-container .slider-inside .light.size-3 {
  width: 8.25rem;
  height: 8.25rem;
}
.slider-container .slider-inside .clouds {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.slider-container .slider-inside .clouds .cloud-ball-container {
  width: inherit;
  height: inherit;
  position: inherit;
  filter: drop-shadow(-0.5rem -0.7rem 0 #97bfd5);
}
.slider-container .slider-inside .clouds .cloud-ball-container .ball {
  border-radius: 50%;
  position: absolute;
  background-color: white;
}
.slider-container .slider-inside .clouds .cloud-ball-container .ball.pos-1 {
  right: -1.8rem;
  bottom: -0.5rem;
  width: 3rem;
  height: 3rem;
}
.slider-container .slider-inside .clouds .cloud-ball-container .ball.pos-2 {
  right: -0.4rem;
  bottom: -0.5rem;
  width: 2rem;
  height: 2rem;
}
.slider-container .slider-inside .clouds .cloud-ball-container .ball.pos-3 {
  right: 0.8rem;
  bottom: -1.2rem;
  width: 2rem;
  height: 2rem;
}
.slider-container .slider-inside .clouds .cloud-ball-container .ball.pos-4 {
  right: 1.8rem;
  bottom: -1.6rem;
  width: 2rem;
  height: 2rem;
}
.slider-container .slider-inside .clouds .cloud-ball-container .ball.pos-5 {
  right: 3rem;
  bottom: -2.1rem;
  width: 2.5rem;
  height: 2.5rem;
}
.slider-container .slider-inside .clouds .cloud-ball-container .ball.pos-6 {
  right: 4.8rem;
  bottom: -1.1rem;
  width: 1.5rem;
  height: 1.5rem;
}
.slider-container .slider-inside .stars {
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 100%;
  transition: top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.slider-container .slider-inside .stars .star::before {
  position: absolute;
  content: "✦";
  color: rgba(255, 255, 255, 0.8);
}
.slider-container .slider-inside .stars .star.pos-1::before {
  font-size: 0.7rem;
  top: 0.4rem;
  left: 2rem;
  opacity: 1;
}
.slider-container .slider-inside .stars .star.pos-2::before {
  font-size: 0.4rem;
  top: 1rem;
  left: 1rem;
  opacity: 0.8;
}
.slider-container .slider-inside .stars .star.pos-3::before {
  font-size: 0.3rem;
  top: 0.9rem;
  left: 2.9rem;
  opacity: 0.7;
}
.slider-container .slider-inside .stars .star.pos-4::before {
  font-size: 0.8rem;
  top: 0.7rem;
  left: 3.5rem;
  opacity: 1;
}
.slider-container .slider-inside .stars .star.pos-5::before {
  font-size: 0.5rem;
  top: 1.7rem;
  left: 1.5rem;
  opacity: 0.9;
}
.slider-container .slider-inside .stars .star.pos-6::before {
  font-size: 0.4rem;
  top: 1.7rem;
  left: 2.5rem;
  opacity: 0.8;
}
.slider-container .slider-inside .stars .star.pos-7::before {
  font-size: 0.6rem;
  top: 0.1rem;
  left: 1.5rem;
  opacity: 0.95;
}
.slider-container .slider-inside .stars .star.pos-8::before {
  font-size: 0.3rem;
  top: 2.2rem;
  left: 3.5rem;
  opacity: 0.7;
}

input[type=checkbox] {
  display: none;
}
input[type=checkbox]:checked + .slider-container .slider-inside {
  background-color: #00121d;
}
input[type=checkbox]:checked + .slider-container .slider-inside .sun-moon {
  left: 4.25rem;
  background-color: #cacaca;
}
input[type=checkbox]:checked + .slider-container .slider-inside .sun-moon .moon-crater {
  opacity: 1;
}
input[type=checkbox]:checked + .slider-container .slider-inside .light {
  left: 4.25rem;
  background-color: rgba(255, 255, 255, 0.05);
}
input[type=checkbox]:checked + .slider-container .slider-inside .clouds {
  top: 100%;
}
input[type=checkbox]:checked + .slider-container .slider-inside .stars {
  top: 0;
}
</style>

<input type="checkbox" name="day-night" id="day-night" on:click={toggleTheme}>
<label class="slider-container" for="day-night">
    <div class="slider-inside">
    <div class="clouds">
        <div class="cloud-ball-container">
        <div class="ball pos-1"></div>
        <div class="ball pos-2"></div>
        <div class="ball pos-3"></div>
        <div class="ball pos-4"></div>
        <div class="ball pos-5"></div>
        <div class="ball pos-6"></div>
        </div>
    </div>
    <div class="stars">
        <div class="star pos-1"></div>
        <div class="star pos-2"></div>
        <div class="star pos-3"></div>
        <div class="star pos-4"></div>
        <div class="star pos-5"></div>
        <div class="star pos-6"></div>
        <div class="star pos-7"></div>
        <div class="star pos-8"></div>
    </div>
    <div class="light size-1"></div>
    <div class="light size-2"></div>
    <div class="light size-3"></div>
    <div class="sun-moon">
        <div class="moon-crater size-1"></div>
        <div class="moon-crater size-2"></div>
        <div class="moon-crater size-3"></div>
    </div>

    </div>
</label>
