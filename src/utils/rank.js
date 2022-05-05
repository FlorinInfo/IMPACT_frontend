const rankPerform = (points, zoneRole, admin)=> {
    if(admin==true) {
        return {
            type:"Admin",
            color:"red",
            image:"admin.png"
        }
    }
    if(zoneRole == "ADMINISTRATOR") {
        return {
            type:"Administrator",
            color:"#d32f2f",
            image:"administrator.png"
        }
    }

    if(zoneRole == "MODERATOR") {
        return {
            type:"Moderator",
            color:"#ed6c02",
            image:"administrator.png"
        }
    }
    if(points >= 0 && points <= 711232332) return {
        type:"Cetatean",
        color:"blue",
        image:"CETATEAN.jpg"
    }
}

export default rankPerform;