# Beispielanwendung zum Modul _Frontend-Frameworks für Webanwendungen_

Dies ist die Implementierung der Beispielanwendung aus dem Modul _Frontend-Frameworks für Webanwendungen_ mithilfe des Frameworks _Vue.js_.

## Project setup

Zum initialen Setup des Projekts müssen Sie mithilfe des Befehls

```
npm install
```

die notwendigen Pakete installieren.

### Kompilation im Entwicklungsmodus

Mit dem Befehl

```
npm run serve
```

starten Sie die Anwendung im Entwicklungsmodus, d.h. jede Änderung an der Anwendung wird sofort angezeigt.

### Kompilation im Produktionsmodus

Mit dem Befehl

```
npm run build
```

erzeugen Sie eine komprimierte Version der Anwendung, die dann im Verzeichnis _dist_ abgelegt wird. Diese Version kann dann auf einem Webserver oder einem anderen Computer installiert werden.
Falls die Anwendung unter einem anderen Pfad als `/` laufen soll, können Sie den Pfad der Anwendung über die Variable `publicPath` in der Datei `vue.config.js` angeben.
Damit dies nur für die Produktionsversion gilt, können Sie so vorgehen:

```js
module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/production-sub-path/" : "/",
};
```

### Komonententests

Mit dem Befehl

```
npm run test:unit
```

starten Sie die Testanwendung, die die Komponenten des Moduls testen kann.
