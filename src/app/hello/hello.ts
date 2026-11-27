import { Component, computed, signal,effect } from '@angular/core';

@Component({
  selector: 'app-hello',
  imports: [],
  templateUrl: './hello.html',
  styleUrl: './hello.scss',
})
export class Hello {
  protected title = 'Welcome to the First Angular State';
  protected isDisabled = false;
  protected count = signal(0);
  protected doubleCount = computed(() => this.count() * 2);
  protected increment(){
    this.count.update(value => value + 1);
  }
  protected decrement(){
    this.count.update(value => value - 1);
  }
  protected reset(){
    this.count.set(0);
  }

  private readonly countLog = effect(() => {
    console.log('Count: ', this.count());
  });
  
}
