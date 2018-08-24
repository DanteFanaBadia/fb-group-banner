const ENDPOINT = "https://graph.facebook.com";
const ACCESS_TOKEN = "239199982824315|3L1T4SUoHU7KPXUB3UiEhPnsTns";
const GROUP_ID = "206265449388631";

class UsersBanner extends HTMLElement {
  
  constructor() {
    super();
    this.dom = undefined;
    this.menbers = undefined;
    this.banner = undefined;
  }
  
  connectedCallback() {
    this.dom = this.attachShadow({ mode: "open" });
    this.dom.appendChild(this.getTemplate());
    this.initEl();
  }

  getTemplate() {
    return document.querySelector("template").content.cloneNode(true);
  }

  initEl() {
    this.banner = this.dom.getElementById("banner");
    this.getProfiles();
  }
  
  getProfiles() {
    var url = this.buildUrl();
    fetch(url)
      .then(response => {return response.json();})
      .then(menbers => (this.menbers = menbers.data))
      .then(() => this.render());
  }

  buildUrl(){
    return `${ENDPOINT}/${GROUP_ID}/members?access_token=${ACCESS_TOKEN}`;
  }

  render() {
    this.banner.innerHTML = "";
    this.users
      .forEach(member =>( this.banner.innerHTML += `<img src="${ENDPOINT}${member.id}/picture"/>` ));
  }
}

customElements.define("users-banner", UsersBanner);
