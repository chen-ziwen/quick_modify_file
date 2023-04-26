<template>
    <nav class="c-nav">
        <ul>
            <li>
                <RouterLink :to="{ name: 'file-reslove' }" active-class="active">文件处理</RouterLink>
            </li>
            <li>
                <RouterLink :to="{ name: 'a' }" active-class="active">A</RouterLink>
            </li>
            <li>
                <RouterLink :to="{ name: 'b' }" active-class="active">B</RouterLink>
            </li>
            <li>
                <RouterLink :to="{ name: 'c' }" active-class="active">C</RouterLink>
            </li>
        </ul>
    </nav>
</template>
<script lang='ts' setup>

</script>
<style lang='scss' scoped>
.c-nav {
    height: 100%;

    ul {

        li {
            a {
                width: 100%;
                height: 50px;
                line-height: 50px;
                display: inline-block;
                padding: 0 20px;
                box-sizing: border-box;
                color: #fff;
            }
        }
    }

    .active {
        background-color: rgba(40, 58, 78, 0.8);
    }
}
</style>