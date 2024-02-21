<template>
  <div class="container">
    <el-tabs v-model="message">
      <el-tab-pane :label="`未读消息(${state.unread.length})`" name="first">
        <el-table :data="state.unread" :show-header="false" style="width: 100%">
          <el-table-column>
						<template #default="scope">
							<span class="message-title">{{ scope.row.title }}</span>
						</template>
					</el-table-column>
          <el-table-column prop="date" width="180"></el-table-column>
					<el-table-column width="120">
						<template #default="scope">
							<el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
						</template>
					</el-table-column>
        </el-table>
        <div class="handle-row">
					<el-button type="primary">全部标为已读</el-button>
				</div>
      </el-tab-pane>

      <el-tab-pane :label="`已读消息(${state.read.length})`" name="second">
        <el-table :data="state.read" :show-header="false" style="width: 100%">
          <el-table-column>
            <template #default="scope">
              <span class="message-title">{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="date" width="150"></el-table-column>
          <el-table-column width="120">
            <template #default="scope">
              <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="handle-row">
          <el-button type="danger">删除全部</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane :label="`回收站(${state.recycle.length})`" name="third">
        <el-table :data="state.recycle" :show-header="false" style="width: 100%">
          <el-table-column>
            <template #default="scope">
              <span class="message-title">{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="date" width="150"></el-table-column>
          <el-table-column width="120">
            <template #default="scope">
              <el-button @click="handleRestore(scope.$index)">还原</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="handle-row">
          <el-button type="danger">清空回收站</el-button>
				</div>
			</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue';

interface Message {
  date: string,
  title: string
}
interface State {
  [key: string]: Message[]
}

const message = ref<string>('first');
const state = reactive<State>({
  unread: [
    {
      date: '2018-04-19 20:00:00',
      title: '【系统通知】该系统将于今晚凌晨2点进行升级维护'
    },
    {
			date: '2018-04-19 21:00:00',
			title: '今晚12点整发大红包，先到先得'
		}
  ],
  read: [
		{
			date: '2018-04-19 20:00:00',
			title: '【系统通知】该系统将于今晚凌晨3点进行升级维护'
		}
	],
  recycle: [
		{
			date: '2018-04-19 20:00:00',
			title: '【系统通知】该系统将于今晚凌晨4点进行升级维护'
		}
	]
});

function handleRead(index: number) {
  state.read.unshift(state.unread.splice(index, 1)[0])
};
function handleDel(index: number) {
  state.recycle.unshift(state.read.splice(index, 1)[0]);
};
function handleRestore(index: number) {
  state.read.unshift(state.recycle.splice(index, 1)[0]);
};
</script>

<style>
.message-title {
	cursor: pointer;
}
.handle-row {
	margin-top: 30px;
}
</style>
