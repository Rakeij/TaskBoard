import { Component, OnInit } from '@angular/core';
import { AdminConfig } from 'src/app/Admin/shared/AdminConfig';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent implements OnInit {



  constructor(public aconfig: AdminConfig) {
  }

  ngOnInit() {
    this.aconfig.GetAllToolBoxItems();
  }


  public drop(event: CdkDragDrop<string[]>) {
    console.log(event.previousContainer.id);
    if (event.container == event.previousContainer) {
      // modify in own table
      for (var table of this.aconfig.SelectedTable.Table.TableList) {
        if (table.UniqueId === event.container.id) {
          var selectedItem = table.List[event.previousIndex];
          table.List.splice(event.previousIndex, 1);
          table.List.splice(event.currentIndex, 0, selectedItem);
        }
      }
    }
   
    else if (event.container.id == "toolboxList") {
      // delete from list
      for (var table of this.aconfig.SelectedTable.Table.TableList) {
        //remove from previous list
        if (table.UniqueId === event.previousContainer.id) {
          table.List.splice(event.previousIndex, 1);
        }
      }
    }
    return;
  }


}
