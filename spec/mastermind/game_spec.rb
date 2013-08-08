require 'spec_helper'

module Mastermind
  describe Game do
    subject { @game }
    before do
      @game = Mastermind::Game.start('12345')
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

      context "with two number match" do
        it "sends a mark with '--'" do
          @game.guess('21666')
          @game.mark.should eq('--')
        end
      end

      context "with one number match and one number correct" do
        it "sends a mark with '+-" do
          @game.guess('13666')
          @game.mark.should eq('+-')
        end
      end

      context "with one match and one duplicate" do
        it "sends a mark with '+'" do
          @game.guess('11666')
          @game.mark.should eq('+')
        end
      end

      context "with one match and two duplicates" do
        it "sends a mark with '+'" do
          @game.guess('11166')
          @game.mark.should eq('+')
        end
      end

      context "with two duplicate matches" do
        it "sends a mark with '++'" do
          @game = Mastermind::Game.start('11234')
          @game.guess('11666')
          @game.mark.should eq('++')
        end
      end

      context "with one match and one exact - this one fails in cucumber" do
        it "sends a mark with '++'" do
          @game = Mastermind::Game.start('11345')
          @game.guess('11166')
          @game.mark.should eq('++')
        end
      end

      context "with one match and one duplicate" do
        it "sends a mark with '-'" do
          @game = Mastermind::Game.start('12345')
          @game.guess('61166')
          @game.mark.should eq('-')
        end
      end

      context "with two matches and one duplicate" do
        it "sends a mark with '++'" do
          @game = Mastermind::Game.start('11234')
          @game.guess('11166')
          @game.mark.should eq('++')
        end
      end

      context "with two matches and one number match" do
        it "sends a mark with '++-'" do
          @game = Mastermind::Game.start('11234')
          @game.guess('11612')
          @game.mark.should eq('++-')
        end
      end

      context "with one match and all duplicates" do
        it "sends a mark with '+'" do
          @game = Mastermind::Game.start('15554')
          @game.guess('11112')
          @game.mark.should eq('+')
        end
      end
    end

    describe '#play' do
      describe 'game page' do
        it "shows title Mastermind" do
          visit '/mastermind'
          page.should have_content('Mastermind')
        end
      end
    end
  end
end