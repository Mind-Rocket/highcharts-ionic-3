export class DataService {
  private pieData = [100, 50, 200, 25, 75, 150];

  getPieData(){
    return this.pieData.slice(0);
  }
}
