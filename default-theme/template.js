// template.js - Główny plik szablonu
const React = require('react');

// Klasa szablonu implementująca wymagany interfejs
class MinimalTemplate {
  constructor() {
    this.id = "minimal-template";
    this.name = "Minimal Template";
    this.description = "Najprostszy przykładowy szablon do testowania dynamicznego ładowania";
    this.version = "1.0.0";
    this.author = "Przykładowy Autor";
  }
  
  // Zwraca definicje layoutów - faktycznie są rejestrowane osobno przez system
  getLayouts() {
    return [];
  }
  
  // Zwraca definicje widgetów - faktycznie są rejestrowane osobno przez system
  getWidgets() {
    return [];
  }
  
  // Zwraca definicje kroków przepływu - faktycznie są rejestrowane osobno przez system
  getFlowSteps() {
    return [];
  }
  
  // Zwraca workspace'y zdefiniowane w szablonie
  getWorkspaces() {
    return [
      {
        id: "minimal-workspace",
        name: "Minimal Workspace",
        description: "Prosty workspace do testowania",
        icon: "star", // Podstawowa ikona
        getScenarios: () => this.getScenarios(),
        templateSettings: {
          layoutTemplate: "simple-layout", // ID naszego layoutu
          scenarioWidgetTemplate: "simple-widget", // ID naszego widgetu
          defaultFlowStepTemplate: "simple-flow-step", // ID naszego flow step
          theme: "light"
        },
        getInitialContext: () => this.getInitialContext()
      }
    ];
  }
  
  // Zwraca scenariusze dla workspace'a
  getScenarios() {
    return [
      {
        id: "minimal-scenario",
        name: "Przykładowy Scenariusz",
        description: "Prosty scenariusz testowy",
        icon: "file",
        systemMessage: "Jesteś pomocnym asystentem.",
        getSteps: () => [
          {
            id: "step-1",
            scenarioId: "minimal-scenario",
            label: "Krok pierwszy",
            assistantMessage: "To jest pierwszy krok w scenariuszu:",
            contextPath: "data.step1",
            templateId: "simple-flow-step",
            attrs: {
              schemaPath: "schemas.form.simpleForm"
            }
          },
          {
            id: "step-2",
            scenarioId: "minimal-scenario",
            label: "Krok drugi",
            assistantMessage: "To jest drugi krok w scenariuszu:",
            contextPath: "data.step2",
            templateId: "simple-flow-step",
            attrs: {
              schemaPath: "schemas.form.simpleForm"
            }
          }
        ]
      }
    ];
  }
  
  // Zwraca początkowy kontekst dla workspace'a
  getInitialContext() {
    return {
      schemas: {
        form: {
          simpleForm: [
            {
              name: "name",
              label: "Nazwa",
              type: "text",
              required: true
            },
            {
              name: "description",
              label: "Opis",
              type: "text",
              required: false
            }
          ]
        }
      }
    };
  }
}

// Eksport klasy szablonu
module.exports = MinimalTemplate;