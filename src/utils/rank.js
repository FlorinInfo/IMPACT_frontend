const rankPerform = (points, zoneRole, admin) => {
  if (admin == true) {
    return {
      type: "Admin",
      color: "red",
      image: "admin.png",
    };
  }
  if (zoneRole == "ADMINISTRATOR") {
    return {
      type: "Administrator",
      color: "#d32f2f",
      image: "administrator.png",
    };
  }

  if (zoneRole == "MODERATOR") {
    return {
      type: "Moderator",
      color: "#ed6c02",
      image: "administrator.png",
    };
  }
  if (points >= 0 && points <= 20)
    return {
      type: "Cetatean",
      color: "#035397",
      image: "CETATEAN.png",
    };
  if (points > 20 && points <= 50)
    return {
      type: "Cetatean implicat",
      color: "#001E6C",
      image: "cetatean_implicat.png",
    };
  if (points > 50 && points <= 70)
    return {
      type: "Cetatean model",
      color: "#712B75",
      image: "cetatean_model.png",
    };
  if (points > 70)
    return {
      type: "CyberCetatean",
      color: "#C74B50",
      image: "cyber_cetatean.png",
    };
};

export default rankPerform;
