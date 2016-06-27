---
title: "Broker using RMI"
excerpt: "Small implementation of a Broker using Java RMI."
header:
  teaser: broker-rmi.png
sidebar:
  - title: "Author"
    text: "Francisco Menéndez Moya"
  - title: "Category"
    text: "Software Architecture"
  - title: "Language used"
    text: "Java"
gallery:
  - url: broker-rmi.png
    image_path: broker-rmi.png
    alt: "C&C View"
---

{% include base_path %}

This project contains a fully working version of a Broker implemented in Java using the RMI framework. In the project, two servers register their services in the Broker, and afterwards a Client connects to the Broker to perform a chosen operation. The entire system is secured via RMI's security manager.{: .text-justify}

The benefit of using a Broker instead of directly connecting to the servers (although Java RMI by itself is already a Broker), is the transparency in which servers are managed along with their operations to the Client since it only communicates with the Broker and asks for its registered services.{: .text-justify}

In order to fully test the system, execute LanzarRMI class, which launches an instance of Java's RMI framework. By default it uses port 1099, although you can pass an alternate port through the class parameter. Afterwards launch an instance of a Broker with the class Lanzador and argument "-broker" so that every server that tries to register has something to register to. With these two pieces working you can already try to connect like a normal user would, using class Lanzador with parameter "-cliente", although no services will be available since no servers have been registered. To "fix" this, just execute server A, B, or both with class Lanzador and parameters "-serverA" or "-serverB" respectively.{: .text-justify}

**Note:** This basic implementation doesn't take into account whenever a server is closed after being registered in the Broker, so it is possible that the Broker offers services (methods) that aren't currently available since the server might have been accidentally destroyed.{: .notice--info} 

{% include gallery caption="Abstract Component & Conector View." %}

[View the project source code](https://github.com/M3tax/BrokerRMI){: .btn .btn--info}
