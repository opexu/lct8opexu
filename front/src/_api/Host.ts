const HOST = {
    
    BACK_IN_DOCKER: "/admin/",
    STANDALONE: "http://localhost:1337/",

    ROOT_API(){
        return import.meta.env.VITE_BACK_IN_DOCKER === "true" ? this.BACK_IN_DOCKER : this.STANDALONE;
    }
}

export { HOST };