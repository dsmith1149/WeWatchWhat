package org.launchcode.BingeBuddy.dto;

public class AveragesDTO {

    String label;
    String value;

    public AveragesDTO(){}

    public AveragesDTO(String label, String value) {
        this.label = label;
        this.value = value;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
    }


