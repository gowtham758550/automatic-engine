import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Condition, Parameter, RuleForm, Select, Simple, SimpleForm } from './app.model';
import { MultiSelectDropdownComponent } from './multi-select-dropdown/multi-select-dropdown.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule, MultiSelectDropdownComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'demo';

  parameterEnum = Parameter;
  formGroup!: FormGroup<SimpleForm>;
  parameterOptions!: Select<Parameter>[];
  conditionOptions!: Select<Condition>[];
  ipAddressConditions: Select<Condition>[] =[
    {
      value: Condition.Equal,
      label: 'Equal'
    },
    {
      value: Condition.NotEqual,
      label: 'Not Equal'
    }
  ]
  dateConditions: Select<Condition>[] = [
    {
      value: Condition.Before,
      label: 'Before'
    },
    {
      value: Condition.After,
      label: 'After'
    },
    {
      value: Condition.Between,
      label: 'Between'
    }
  ]
  readerGroupConditions: Select<Condition>[] = [
    {
      value: Condition.In,
      label: 'In'
    },
    {
      value: Condition.NotIn,
      label: 'Not In'
    }
  ]
  countryConditions: Select<Condition>[] = [
    {
      value: Condition.Equal,
      label: 'Equal'
    },
    {
      value: Condition.NotEqual,
      label: 'Not Equal'
    }
  ];
  countryItems = [
    {
      value: 'India',
      selected: false,
      id: '1'
    },
    {
      value: 'USA',
      selected: false,
      id: '2'
    },
    {
      value: 'UK',
      selected: false,
      id: '3'
    }
  ];
  readerGroupItems = [
    {
      value: 'Group 1',
      selected: false,
      id: '1'
    },
    {
      value: 'Group 2',
      selected: false,
      id: '2'
    },
    {
      value: 'Group 3',
      selected: false,
      id: '3'
    }
  ]

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm() {
    this.parameterOptions = [
      {
        value: Parameter.IpAddress,
        label: 'IP Address'
      },
      {
        value: Parameter.Date,
        label: 'Date'
      },
      {
        value: Parameter.ReaderGroup,
        label: 'Reader Group'
      },
      {
        value: Parameter.Country,
        label: 'Country'
      }
    ];
    this.formGroup = new FormGroup<SimpleForm>({
      name: new FormControl<string>('') as FormControl<string>,
      list: new FormArray<FormGroup<RuleForm>>([]),
    });
  }

  addParameter(data?: any) {
    // const a = new FormControl<string>("");
    // console.log(a);

    const formGroup = new FormGroup<RuleForm>({
      parameter: new FormControl(null) as FormControl<Parameter | null>,
      condition: new FormControl(null) as FormControl<Condition | null>,
      value: new FormControl(this.countryItems.filter(x => x.selected).map(x => x.value)) as FormControl<string[]>,
      // dummy form control to bind date value to 👆`value`👆 field
      date: new FormControl(null) as FormControl<Date | null>
    });
    formGroup.controls.parameter.valueChanges.subscribe(v => {
      if (v) {
        formGroup.controls.value.setValue([]);
      }
    });

    formGroup.controls.date.valueChanges.subscribe(v => {
      if (v) {
        formGroup.controls.value.setValue([v.toString()]);
      }
    });

    if (data) formGroup.patchValue(data);
    this.formGroup.controls.list.push(formGroup);
  }

  removeParameter(index: number) {
    // if (this.formGroup.controls.list.length === 1) return;
    this.formGroup.controls.list.removeAt(index);
  }

  bindData() {
    const data: Simple = {
      name: "Name",
      list: [
        {
          parameter: Parameter.IpAddress,
          condition: Condition.Equal,
          value: ['1.2.3.4']
        },
        {
          parameter: Parameter.Date,
          condition: Condition.Before,
          value: ['2021-07-01']
        },
        {
          parameter: Parameter.ReaderGroup,
          condition: Condition.In,
          value: ['1', '2']
        },
        {
          parameter: Parameter.Country,
          condition: Condition.Equal,
          value: ['India']
        }
      ]
    };
    this.formGroup.patchValue(data);
    data.list.forEach(item => this.addParameter(item));

  }
}
