import cookies from "js-cookie";

export default {
    name: "Navbar",
    methods: {
        logout() {
            this.$store.dispatch("logout");
        },
        darkMode() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            localStorage.setItem("dark_theme", this.$vuetify.theme.dark);
        }
    },
    beforeMount() {
        this.$store.dispatch("fetchItems")
        this.token = cookies.get("token");
        this.theme = localStorage.getItem("dark_theme");
        if (this.theme === "false") this.$vuetify.theme.dark = false;
        else if (this.theme === "true") this.$vuetify.theme.dark = true;
    },
    mounted() {
        if (this.token) {
            this.$store.commit("SET_TOKEN", this.token);
            this.$axios
                .get("profile", {
                    headers: {
                        token: this.token
                    }
                })
                .then(res => {
                    this.$store.commit("SET_USER", res.data);

                })
                .catch(err => {
                    this.$store.dispatch("logout");
                });
        }
    },

    data() {
        return {
            login: false,
            register: false,
            token: "",
            theme: ""
        };
    }
};