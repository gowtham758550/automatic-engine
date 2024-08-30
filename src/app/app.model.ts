import { FormArray, FormControl, FormGroup } from "@angular/forms";

export interface Item {
  value: string;
  // selected: boolean;
  id: string;
}

export interface SimpleForm {
  name: FormControl<string>;
  list: FormArray<FormGroup>;
}

export interface Simple {
  name: string;
  list: Rule[];
}

export interface Rule {
  parameter: Parameter;
  condition: Condition;
  value: string[];
}

export interface RuleForm {
  parameter: FormControl<Parameter | null>;
  condition: FormControl<Condition | null>;
  value: FormControl<string[]>;
  date: FormControl<Date | null>;
}

export enum Parameter {
  IpAddress = 1,
  Date,
  ReaderGroup,
  Country
}


export enum Condition {
  Equal = 1,
  NotEqual,
  In,
  NotIn,
  Before,
  After,
  Between,
}


export interface Select<T> {
  value: T,
  label: string,
}
