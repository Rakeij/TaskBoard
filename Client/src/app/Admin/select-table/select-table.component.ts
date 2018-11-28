import { Component, OnInit } from '@angular/core';
import { AdminConfig } from 'src/app/Admin/shared/AdminConfig';

@Component({
  selector: 'app-select-table',
  templateUrl: './select-table.component.html',
  styleUrls: ['./select-table.component.css','switch.select-table.component.css']
})
export class SelectTableComponent implements OnInit {
  constructor(public aconfig: AdminConfig) { }
  ngOnInit() {
    this.aconfig.GetAllConfigurations();
  }

  public ActivateDisactivateConfig(id: number) {
    this.aconfig.TableConfiguration[id].Active = !this.aconfig.TableConfiguration[id].Active;
    this.aconfig.SaveConfiguration(this.aconfig.TableConfiguration[id]);
  }




  public selectConfiguration(name: string) {
    this.aconfig.TableConfiguration.forEach((item) => {
      if (item.Name === name) this.aconfig.SelectedTable = item;
    });
    this.aconfig.UpdateSelectedTable();
    console.log(this.aconfig.SelectedTable.Id);
  }
  public deleteConfiguration(name: string) {
    this.aconfig.TableConfiguration.forEach((item) => {
      if (item.Name === name) this.aconfig.DeleteConfiguration(item);
    });
  }
  public isEmptyConfiguration(): boolean {
    var result = false;
    this.aconfig.TableConfiguration.forEach((item) => { if (item.Name == "") { result = true } });
    return result;
  }
  public isDubbleNameUsed(): string {
    var result = null;
    this.aconfig.TableConfiguration.forEach((item, index) => {
      this.aconfig.TableConfiguration.forEach((item1, index1) => {
        if (item.Name.toUpperCase() === item1.Name.toUpperCase() && index != index1)
          result = "Naam moet uniek zijn!";
      })
    });
    return result;
  }




}
