require 'spec_helper'

module Mastermind
  describe Game do
    subject { @game }
    before do
      @game = Game.new
      @game.start('12345')
    end

    describe '#start' do
      its(:code) { should_not be_empty }
    end

    describe '#guess' do
      context "with no matches" do
        it "sends a mark with ''" do
          @game.guess('66666')
          @game.mark.should eq('')
        end
      end

      context "with one number match" do
        it "sends a mark with '-'" do
          @game.guess('26666')
          @game.mark.should eq('-')
        end
      end

      context "with one number correct" do
        it "sends a mark with '+'" do
          @game.guess('16666')
          @game.mark.should eq('+')
        end
      end

    end
  end
end